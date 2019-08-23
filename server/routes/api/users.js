const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;

// @route   GET /api/users/all
// @desc    Get all users (include: projects & skill)
// @access  Public
router.get("/all", (req, res) => {
  User.findAll({
    include: [{ all: true }]
  }).then(users => {
    console.log(users);
  });
});

// Route to play with params
router.get("/:userId", (req, res) => {
  let userId = req.params.userId;
  User.findByPk(userId).then(user => {
    console.log(user);
  });
});
module.exports = router;
