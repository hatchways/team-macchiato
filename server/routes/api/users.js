const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;
const UserSkill = require("../../models").UserSkill;

router.get("/all", (req, res) => {
  User.findAll({
    include: [{ model: Skill, as: "skill" }]
  }).then(users => {
    console.log(users);
  });
});
router.get("/:userId", (req, res) => {
  let userId = req.params.userId;
  User.findByPk(userId).then(user => {
    console.log(user);
  });
});
module.exports = router;
