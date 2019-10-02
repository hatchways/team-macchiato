const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;
const Entity = require("../../models").Entity;
const Liked_Entity = require("../../models").Liked_Entity;
const Entity_Comment = require("../../models").Entity_Comment;

import { awsController } from "./awsController";

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
const fetchProjPhotosFromS3 = projs => {
  projs = projs.map(async proj => {
    let photos = proj.photos.map(async data => {
      let obj = JSON.parse(data);
      let key = obj.Key;
      if (key) {
        console.log(key);
        return awsController
          .handleRetrieve(key)
          .then(res => {
            return {
              ContentType: res.ContentType,
              Body: res.Body
            };
          })
          .catch(err => {
            console.log(err);
            throw "Failed to retrieve from s3: " + err;
          });
      }
      console.log("Nope");
      return ""; // if no key, return empty string
    });

    return Promise.all(photos).then(photos => {
      // console.log(photos)
      return {
        id: proj.id,
        photos,
        desc: proj.desc,
        title: proj.title,
        link: proj.link
      };
    });
  });

  return Promise.all(projs);
};

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    Project.findAll({
      where: {
        user_id: userId
      }
    })
      .then(fetchProjPhotosFromS3)
      .then(projs => {
        res.send(projs);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const addToS3 = (photos, userId) =>
  photos.map(async data => {
    // key will be of form UNIXTIMESTAMP_FILENAME_IMGBASE64LENGTH
    let key = Date.now() + "_" + data.fileName;
    let imageData = data.imageData;
    return awsController
      .handleUpload(key, imageData, userId)
      .then(res => res)
      .catch(err => {
        console.log(err);
        throw "Failed to upload to s3: " + err;
      });
  });

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
        return res.status(500).send("Sorry, all fields required");

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
      let s3Photos = addToS3(photos, userId);
      if (s3Photos) {
        Promise.all(s3Photos).then(photoS3Data => {
          // res.send(photoS3Data)
          Entity.create({}).then(entity => {
            let project = {
              // use photoS3
              photos: photoS3Data,
              title,
              desc,
              link,
              user_id: userId,
              entity_id: entity.id
            };
            Project.create(project).then(proj => {
              console.log(
                `Successfully created project with projId ${proj.id}`
              );
              return res.send(proj);
            });
          });
        });
      }
      return;
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
          res.status(200).send("Comment is created");
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
