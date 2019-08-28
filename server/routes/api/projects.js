const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;

// Upload new project
router.post("/", async (req, res) => {
   // Possibly check if project already exists?
   // - using title and link maybe                 LOW PRIO

   // Do some verification
   // Do something with userId
   // - front-end sends some sort of thing that can be linked to userId
   const { photos, title, desc, link } = req.body;
   // Do stuff with photos to upload them to s3
   // Create photos array of s3 links
   let photoS3 = photos.split(',');
   photoS3 = ['one', 'two'];
   
   const userId = 25;   // Replace

   let project = {   // use photoS3
      photoS3, title, desc, link, userId
   };
   // project.userId = userId;
   Project.create(project).then(x => {
      console.log(`Successfully created project with projId ${x.id}`);
      return res.send(x);
   })
});

// Update existing project
router.put("/:projectId", (req, res) => {
   // Do user verification
   // - Users can only edit their own projects
   const projectId = req.params.projectId
   const data = req.body
   data.photos = ['one', 'two']
   
   Project.findOne({
      where: {
         id: projectId
      }
   }).then(proj => {
      if (proj){
         proj.update(data).then(proj => {
            console.log(`Project with id '${proj.id}' named '${proj.title}' updated!`)
            return res.send(proj)
         })
      }
   })

});
module.exports = router;
