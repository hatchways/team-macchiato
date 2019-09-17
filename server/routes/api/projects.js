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
         projs = projs.map(async proj => {
            let photos = proj.photos.map(async data => {
               let obj = JSON.parse(data)
               let key = obj.Key
               if (key) {
                  console.log(key)
                  return awsController.handleRetrieve(key)
                     .then(res => {
                        return {
                           ContentType: res.ContentType,
                           Body: res.Body
                        }
                     })
                     .catch(err => {
                        console.log(err)
                        throw "Failed to retrieve from s3: " + err
                     })
               }
               console.log("Nope")
               return '' // if no key, return empty string
            })

            return Promise.all(photos)
               .then(photos => {
                  // console.log(photos)
                  return {
                     photos,
                     desc: proj.desc,
                     title: proj.title,
                     link: proj.link,
                  }
               })
         })
         
         Promise.all(projs)
            .then(projs => res.send(projs))
      })
   } catch (err) {
      console.log(err)
      res.status(500).send(err)
   }
})

const addToS3 = (photos, userId) => photos.map(async data => {
   // key will be of form UNIXTIMESTAMP_FILENAME_IMGBASE64LENGTH
   let key = Date.now() + '_' + data.fileName
   let imageData = data.imageData
   return awsController.handleUpload(key, imageData, userId)
      .then(res => res)
      .catch(err => {
         console.log(err)
         throw "Failed to upload to s3: " + err
      })
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
         let s3Photos = addToS3(photos, userId)
         if (s3Photos) {
            Promise.all()
               .then(photoS3Data => {
                  // res.send(photoS3Data)
                  let project = {   // use photoS3
                     photos: photoS3Data, title, desc, link, userId
                  };

                  Project.create(project).then(proj => {
                     console.log(`Successfully created project with projId ${proj.id}`);
                     return res.send(proj);
                  })
               })
         }
         return
      } catch (err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
);

// Update existing project
// Note: when updating photos, photos param must be like:
// photos: { removed: [...], added: [...]}
//  removed contains s3Keys, while added contains base64 imageData
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
               let updateProject = (data) => {
                  proj.update(data).then(proj => {
                     console.log(`Project with id '${proj.id}' belonging to ${proj.userId} updated!`)
                     return res.send(proj)
                  })
               }
               // If we're updating photos
               if (data.photos) {
                  // removed contains s3 key of stored photos
                  let removed = data.photos.removed
                  // added contains: { fileName: ... , imageData: ... }
                  let added = data.photos.added

                  // Remove all removed photos
                  for (let e of removed) {
                     let key = e.Key
                     awsController.handleDelete(key)
                  }
                  // Filter removed from proj.photos
                  let photos = proj.photos.filter(e => !removed.includes(e.Key))
                  // Add new photos
                  Promise.all(addToS3(added))
                     .then(photoS3Data => {
                        photos.concat(photoS3Data)
                        // Set data.photos to updated photos
                        data.photos = photos
                        updateProject(data)
                     })
               }
               else {
                  updateProject(data)
               }
            }
            else {
               let err = `Project with id '${proj.id}' Does Not Exist!`
               console.log(err)
               return res.status(500).send({ error: err })
            }
         })
      } catch (err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
);
module.exports = router
