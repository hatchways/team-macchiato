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

// @route   PUT /api/users/:userId
// @desc    Edit a user with id 'userId'
// @body    Any number of user attributes ... verification TBD
// @access  Authorized
router.put(
   "/edit",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      // - Users can only edit their own projects
      const userId = req.user.id
      const data = req.body

      User.findByPk(userId).then(user => {
         if (user) {
            user.update(data).then(user => {
               console.log(`User with id ${user.id} updated`)
               return res.send(user)
            })
         }
         return res.status(500).send("Error: User does not exist")
      })
   }
);
