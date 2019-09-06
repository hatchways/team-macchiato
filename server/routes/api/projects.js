const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;

// Get all projects of a user
router.get("/:userId", async (req, res) => {
      try {
         const userId = req.params.userId
         Project.findAll({
            where: {
               user_id: userId
            }
         }).then(projs => res.send(projs))
      } catch(err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
)

// Upload new project
router.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      try {
         const userId = req.user.id;
         const { photos, title, desc, link } = req.body;
         // TODO
         // Do stuff with photos to upload them to s3
         // Create photos array of s3 links
         let photoS3 = photos.split(',');
         photoS3 = ['one', 'two'];

         let project = {   // use photoS3
            photoS3, title, desc, link, userId
         };

         // Possibly check if project already exists?
         // - using title and link maybe                 LOW PRIO

         Project.create(project).then(proj => {
            console.log(`Successfully created project with projId ${proj.id}`);
            return res.send(proj);
         })
      } catch(err) {
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
               user_id: userId,
               id: projectId,
            }
         }).then(proj => {
            if (proj) {
               proj.update(data).then(proj => {
                  console.log(`Project with id '${proj.id}' belonging to ${proj.user_id} updated!`)
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
