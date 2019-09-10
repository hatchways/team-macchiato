const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;

import { awsController } from "./awsController"

// Get all projects of a user
// photos are in form:
/*
{
   "type": "Buffer",
   "data": [
      137,
      80,
      ...
   ]
}
*/
router.get("/user/:userId", async (req, res) => {
   try {
      const userId = req.params.userId
      Project.findAll({
         where: {
            userId: userId
         }
      }).then(projs => {
         // Retrieve images from s3
         let photos = projs.photos.map(async data => {
            let Key = data.Key
            let data = awsController.handleRetrieve(Key)
            return data.Body
         });

         Promise.all(photos)
            .then(photos => {
               projs.photos = photos
               res.send(projs)
            })
      })
   } catch (err) {
      console.log(err)
      res.status(500).send(err)
   }
})

// Upload new project
router.post(
   "/upload",
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
          */

         let photoS3Data = photos.map(async data => {
            let fileName = data.fileName
            let imageData = data.imageData
            return awsController.handleUpload(fileName, imageData, userId)
         });

         Promise.all(photoS3Data)
            .then(photoS3Data => {
               let project = {   // use photoS3
                  photos: photoS3Data, title, desc, link, userId
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
   "/update/:projectId",
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
                  /////////
                  // WIP //
                  /////////
                  let photoS3Data = photos.map(async data => {
                     let fileName = data.fileName
                     let imageData = data.imageData
                     return awsController.handleUpload(fileName, imageData, userId)
                  });
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
