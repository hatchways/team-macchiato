const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;
const UserSkill = require("../../models").UserSkill;

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

// Search and filter through "all" users, with limit and offset optional
// body requires: 
//  - where
//  - optional: limit, offset
router.get("/allWhere", (req, res) => {
   let options = req.body
   try {
      User.findAll({
         options
      }).then(users => {
         res.send(users)
      })
   }
   catch (err) {
      res.status(500).send(err)
   }
})

////////////////////////

// @route   PUT /api/users/:userId
// @desc    Edit a user with id 'userId'
// @body    Any number of user attributes ... verification TBD
// @access  Authorized
router.put(
   "/edit",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      // - Users can only edit their own profiles
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

//////////////////////////////
// Skills routes under here //
//////////////////////////////

// Connects user to skill
// Authorization required
// If skill DNE, create it

// @route   POST /api/users/newSkill
// @desc    Connects user to skill, if skill DNE, create it
// @body    { skillName }
// @access  Authorized
router.post(
   "/newSkill",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      const user = req.user
      const { skillName } = req.body
      try {
         // Could replace with findOrCreate
         // Look for skill
         let skill = await Skill.findOne({
            where: {
               skill: skillName
            }
         })

         let createUserSkill = (user, skill) => {
            // Create UserSkill
            let userId = user.id
            let skillId = skill.id
            console.log(`User '${user.name}' has added skill '${skill.skill}'`)
            UserSkill.create({ userId, skillId }).then(userSkill => res.send(userSkill))
         }

         // If skill doesn't exist, create it
         // In this case, no need to check if userSkill already exists
         if (!skill) {
            skill = await Skill.create({ skill: skillName })
            return createUserSkill(req.user, skill)
         }

         // Skill already exists, so...
         // Check if userSkill already exists
         let userSkill = await UserSkill.findOne({
            where: {
               userId: user.id,
               skillId: skill.id
            }
         })
         if (userSkill) {
            return res.status(500).send({ error: `User already has skill '${skill.skill}'` })
         }

         return createUserSkill(req.user, skill)
      } catch (err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
)

router.delete(
   "/removeSkill",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      const userId = req.user.id
      const { skillName } = req.body
      try {
         // Look for skill
         let skill = await Skill.findOne({
            where: {
               skill: skillName
            }
         })
         if (!skill) {
            return res.status(500).send({ error: `Skill ${skillName} Does Not Exist` })
         }

         let userSkill = await UserSkill.findOne({
            where: {
               userId: userId,
               skillId: skill.id
            }
         })
         if (!userSkill) {
            return res.status(500).send({ error: `User does not possess ${skillName}` })
         }

         // Finally, remove skill
         // return res.send({ skill: skill, userId: userId })
         UserSkill.destroy({
            where: { userId: userId, skillId: skill.id }
         }).then(numOfDestroyedRows => {
            console.log("Successfully removed User Skill")
            res.status(200).send({ removed: numOfDestroyedRows })
         })
      } catch (err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
)