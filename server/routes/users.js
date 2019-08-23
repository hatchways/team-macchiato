const express = require("express");
const router = express.Router();
const User = require("../models").User;
const passport = require("passport");
const Project = require("../models").Project;
const Skill = require("../models").Skill;
const UserSkill = require("../models").UserSkill;

router.get("/", function(req, res, next) {
  try {
    User.create({
      name: "albert",
      email: "albertkong@gmail.com"
    }).then(user => {
      user
        .createProject({
          title: "Dan's Project",
          desc: "Wowowow",
          photos: ["img1", "img2"]
        })
        .then(console.log("workded"));
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/skill", function(req, res, next) {
  try {
    User.create({
      name: "Daniel",
      email: "Daniel@gmail.com"
    }).then(user => {
      user
        .createSkill({
          skill: "React"
        })
        .then(console.log("Skill added!"));
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/all", function(req, res, next) {
  try {
    User.findAll({
      include: [Project]
    }).then(users => {
      console.log(users[0].Projects);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/skill/all", async function(req, res, next) {
  try {
    const SkilledUsers = await User.findAll({
      include: [{ model: Skill, as: "skills" }]
    });

    console.log(SkilledUsers[0].skills);
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // console.log(req.user.id);
      const user = await User.findByPk(req.user.id);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);
module.exports = router;
