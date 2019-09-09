const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;

const axios = require('axios')

// Get all projects of a user
router.get("/:userId", async (req, res) => {
   try {
      const userId = req.params.userId
      Project.findAll({
         where: {
            userId: userId
         }
      }).then(projs => res.send(projs))
   } catch (err) {
      console.log(err)
      res.status(500).send(err)
   }
}
)

const handleUpload = async (fileName, imageData, userId) => {
   var aws = require('aws-sdk')
   aws.config.update({
      region: 'us-east-2', // Put your aws region here
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
   })
   const S3_BUCKET = process.env.S3_BUCKET
   var s3 = new aws.S3()
   // var s3Bucket = new aws.S3({ params: { Bucket: S3_BUCKET } })

   let buf = new Buffer(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64')
   let fileType = imageData.split(';')[0].split(':')[1];
   /////////
   // WIP //
   /////////
   // bucketName var below crates a "folder" for each user
   var bucketName = S3_BUCKET + `/user_${userId}`;

   var params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buf,
      ContentType: fileType,
   };

   return new Promise((resolve, reject) => {
      s3.upload(params, function (err, data) {
         if (err) {
            reject({ error: err })
         }

         // TODO: save data to DB
         let location = data.Location
         console.log(location);
         console.log(data);

         resolve({ data: data })
      })
   });
}
// Upload new project
router.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      try {
         const userId = req.user.id;
         const { photos, title, desc, link } = req.body;

         // If any are undefined
         if (!photos || !title || !desc || !link)
            return res.status(500).send("Sorry, all fields required")

         // Example of what handleUpload returns
         /*
         { 
            ETag: '"36bac1f605b776e2ddedfbe80f773952"',
            Location:
            'https://teammacchiatoapp.s3.us-east-2.amazonaws.com/myUserNameAndId/INSTALL_GENTOO.png',
            key: 'myUserNameAndId/INSTALL_GENTOO.png',
            Key: 'myUserNameAndId/INSTALL_GENTOO.png',
            Bucket: 'teammacchiatoapp' 
         }

            Right now we only care about Location
          */

         let photoS3Data = photos.map(async data => {
            let fileName = data.fileName
            let imageData = data.imageData
            return handleUpload(fileName, imageData, userId)
         });

         Promise.all(photoS3Data)
            .then(res => {
               let project = {   // use photoS3
                  photoS3: photoS3Data, title, desc, link, userId
               };

               // Possibly check if project already exists?
               // - using title and link maybe                 LOW PRIO

               Project.create(project).then(proj => {
                  console.log(`Successfully created project with projId ${proj.id}`);
                  return res.send(proj);
               })
            })
      } catch (err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
);

// Update existing project
router.put(
   "/:projectId",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      const userId = req.user.id
      const projectId = req.params.projectId
      const data = req.body

      try {
         Project.findOne({
            where: {
               userId: userId,
               id: projectId,
            }
         }).then(proj => {
            if (proj) {
               if (proj.photos) {
                  // Fetch, compare diff, upload new and delete removed
               }
               proj.update(data).then(proj => {
                  console.log(`Project with id '${proj.id}' belonging to ${proj.userId} updated!`)
                  return res.send(proj)
               })
            }
         })
      } catch (err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
);
module.exports = router
