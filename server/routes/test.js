const express = require("express");
const router = express.Router();
const User = require("../models").User;
const passport = require("passport");
const Project = require("../models").Project;

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
