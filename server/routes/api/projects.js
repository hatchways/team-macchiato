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

// import { signS3 } from './awsController'

const handleUpload = (fileName, fileType, base64) => {
   var aws = require('aws-sdk')
   aws.config.update({
      region: 'us-east-2', // Put your aws region here
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
   })
   const S3_BUCKET = process.env.S3_BUCKET
   var s3 = new aws.S3()
   // var s3Bucket = new aws.S3({ params: { Bucket: S3_BUCKET } })
   
   let buf = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')

   // var data = {
   //    Key: fileName,
   //    Body: buf,
   //    ContentEncoding: 'base64',
   //    ContentType: fileType,
   // };

   // s3Bucket.putObject(data, function (err, data) {
   //    if (err) {
   //       console.log(err);
   //       console.log('Error uploading data: ', data);
   //    } else {
   //       console.log('succesfully uploaded the image!');
   //    }
   // });

   ////////////////////////////
   // WIP
   // Implement this later ////
   // bucketName var below crates a "folder" for each user
   var bucketName = 'myApp/' + req.body.userEmail;
   
   var params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: buf,
      ContentEncoding: 'base64', // might not be necssary
      ContentType: fileType,
      ACL: 'public-read'
   };
   s3.upload(params, function (err, data) {
      if (err) return res.status(500).send(err);

      // TODO: save data to mongo
      res.json(data);
   });
   //
   // Attempting to get a signed request then upload base 64 (Not Working)
   //

   // signS3(fileName, fileType).then(res => {
   //    const { signedRequest, url } = res.data.returnData
   //    console.log(signedRequest)
   //    console.log(url)

   //    const options = {
   //       headers: {
   //          'Content-Type': fileType
   //       }
   //    }
   //    let imageData = base64.replace(/^data:image\/\w+;base64,/, "")

   //    axios.put(signedRequest, imageData, options)
   //       .then(res => {
   //          console.log(res)
   //       })
   //       .catch(err => {
   //          console.log(err)
   //       })
   // })
}
// Upload new project
router.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      try {
         const userId = req.user.id;
         // console.log(req.body)
         const { photos, title, desc, link } = req.body;

         // If any are undefined
         // if (!photos || !title || !desc || !link)
         //    return res.status(500).send("Sorry, all fields required")

         //////////
         // TODO //
         //////////

         let fileName = 'myFileName2.png'
         let fileType = 'image/png'
         // Get signed response from s3
         handleUpload(fileName, fileType, photos[0])

         // signS3('fileName', 'image/png').then(res => {
         //    console.log(res.data)
         // })


         // Do stuff with photos to upload them to s3
         // Create photos array of s3 links
         // let photoS3 = photos.split(',');
         let photoS3 = ['one', 'two'];

         let project = {   // use photoS3
            photoS3, title, desc, link, userId
         };

         // console.log(project)

         res.send("Yes")
         // Possibly check if project already exists?
         // - using title and link maybe                 LOW PRIO

         // Project.create(project).then(proj => {
         //    console.log(`Successfully created project with projId ${proj.id}`);
         //    return res.send(proj);
         // })
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
module.exports = router;
