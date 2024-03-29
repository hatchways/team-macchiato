const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;
const User_Skill = require("../../models").User_Skill;

// @route   GET /api/users/all
// @desc    Get all users (include: projects & skill)
// @access  Public
router.get("/all", (req, res) => {
  console.log("wth");
  User.findAll({
    include: [{ all: true }]
  }).then(users => {
    console.log(users);
  });
});

// @route GET /api/users/:user_id
// @desc GET a specific user (include: all)
// @access PUBLIC

// Route to play with params
router.get("/:userId", (req, res) => {
  let userId = req.params.userId;
  User.findAll({
    include: [
      {
        model: Project
      },
      {
        model: Skill,
        as: "skills"
      }
    ],
    where: { id: userId },
    attributes: ["id", "name", "location", "profile_pic", "email", "title"]
  })
    .then(user => {
      res.send(user[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});
module.exports = router;

// @route   PUT /api/users/:userId
// @desc    Edit a user with id 'userId'
// @body    Any number of user attributes ... verification TBD
// @access  Authorized
router.put(
  "/editProfile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // - Users can only edit their own projects
    const userId = req.user.id;
    let data = req.body;
    for (let [key, val] of Object.entries(data)) {
      if (!val || val == '') delete data[key]
    }
    User.findByPk(userId).then(user => {
      if (user) {
        user.update(data).then(user => {
          console.log(`User with id ${user.id} updated`);
          return res.send(user);
        });
      } else {
        return res.status(500).send("Error: User does not exist");
      }
    });
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
    const user = req.user;
    const { skillName } = req.body;
    try {
      // Look for skill
      let skill = await Skill.findOne({
        where: {
          skill: skillName
        }
      });
      console.log(skillName)
      let createUserSkill = (user, skill) => {
        // Create User_Skill
        let user_id = user.id;
        let skill_id = skill.id;
        console.log(`User '${user.name}' has added skill '${skill.skill}'`);
        User_Skill.create({ user_id, skill_id }).then(userSkill =>
          res.send(userSkill)
        );
      };

      // If skill doesn't exist, create it
      // In this case, no need to check if userSkill already exists
      if (!skill) {
        skill = await Skill.create({ skill: skillName });
        return createUserSkill(req.user, skill);
      }

      // Skill already exists, so...
      // Check if userSkill already exists
      let userSkill = await User_Skill.findOne({
        where: {
          user_id: user.id,
          skill_id: skill.id
        }
      });
      if (userSkill) {
        return res
          .status(500)
          .send({ error: `User already has skill '${skill.skill}'` });
      }

      return createUserSkill(req.user, skill);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

router.delete(
  "/removeSkill",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const { skillName } = req.body;
    try {
      // Look for skill
      let skill = await Skill.findOne({
        where: {
          skill: skillName
        }
      });
      if (!skill) {
        return res
          .status(500)
          .send({ error: `Skill ${skillName} Does Not Exist` });
      }

      let userSkill = await User_Skill.findOne({
        where: {
          user_id: userId,
          skill_id: skill.id
        }
      });
      if (!userSkill) {
        return res
          .status(500)
          .send({ error: `User does not possess ${skillName}` });
      }

      // Finally, remove skill
      // return res.send({ skill: skill, userId: userId })
      User_Skill.destroy({
        where: { user_id: userId, skill_id: skill.id }
      }).then(numOfDestroyedRows => {
        console.log("Successfully removed User Skill");
        res.status(200).send({ removed: numOfDestroyedRows });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
