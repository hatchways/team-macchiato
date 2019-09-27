const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;
const Entity = require("../../models").Entity;
const Liked_Entity = require("../../models").Liked_Entity;
const Entity_Comment = require("../../models").Entity_Comment;

// Get all projects of a user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    Project.findAll({
      where: {
        user_id: userId
      }
    }).then(projs => res.send(projs));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Upload new project
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId);
      const { photos, title, desc, link } = req.body;
      // TODO
      // Do stuff with photos to upload them to s3
      // Create photos array of s3 links
      // let photoS3 = photos.split(',');
      // photoS3 = ["one", "two"];
      let project = {
        // use photoS3
        // photoS3,
        title,
        desc,
        link,
        user_id: userId
      };

      Entity.create({}).then(entity => {
        let project = {
          title,
          desc,
          link,
          entity_id: entity.id,
          user_id: userId
        };

        Project.create(project).then(proj => {
          console.log(`Successfully created project with projId ${proj.id}`);
          return res.send(proj);
        });
      });

      // Possibly check if project already exists?
      // - using title and link maybe                 LOW PRIO

      // Project.create(project).then(proj => {
      //   console.log(`Successfully created project with projId ${proj.id}`);
      //   return res.send(proj);
      // });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// Update existing project
router.put(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const projectId = req.params.projectId;
    const data = req.body;

    try {
      Project.findOne({
        where: {
          user_id: userId,
          id: projectId
        }
      }).then(proj => {
        if (proj) {
          proj.update(data).then(proj => {
            console.log(
              `Project with id '${proj.id}' belonging to ${
                proj.user_id
              } updated!`
            );
            return res.send(proj);
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// Like Project
router.post(
  "/like",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const { entity_id } = req.body;

    try {
      console.log(userId);
      console.log(entity_id);

      let likedEntity = await Liked_Entity.findOne({
        where: {
          user_id: userId,
          entity_id: entity_id
        }
      });

      if (!likedEntity) {
        Liked_Entity.create({
          user_id: userId,
          entity_id: entity_id
        }).then(like => {
          console.log("like_created");
        });
      }

      if (likedEntity) {
        Liked_Entity.destroy({
          where: { user_id: userId, entity_id: entity_id }
        }).then(numOfDestroyedRows => {
          console.log("Successfully removed Entity");
          res.status(200).send({ removed: numOfDestroyedRows });
        });
      }

      // if (userSkill) {
      //   return res
      //     .status(500)
      //     .send({ error: `User already has skill '${skill.skill}'` });
      // }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

router.post(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const { target_entity_id, comment } = req.body;
    try {
      // Create a new entity
      const entity_id = await Entity.create({}).then(entity => {
        return entity.id;
      });

      if (entity_id) {
        Entity_Comment.create({
          comment,
          user_id: userId,
          entity_id: entity_id,
          target_entity_id
        }).then(entity_comment => {
          res.status(200).send("Comment Created");
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);
module.exports = router;
