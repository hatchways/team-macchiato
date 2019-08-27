const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;
const Relationship = require("../../models").Relationship;

const INITIATE = 0
const ACCEPT = 1
const DECLINE = 2
// const BLOCK = 3

// Send a friendship request
// create user_one_id , user_two_id, 0, user_one_id
router.post("/", (req, res) => {
   // Authenticate
   // - init_user_id fetch from the JWT in authentication
   const { init_user_id, target_user_id } = req.body;
   try {
      const user_one_id = Math.min(init_user_id, target_user_id)
      const user_two_id = Math.max(init_user_id, target_user_id)

      let init_id = parseInt(init_user_id)

      let data = {
         // user_one_id: user_one_id,
         user_two_id: user_two_id,
         status: INITIATE,
         action_user_id: init_id
      };
      // console.log(user_one_id)
      console.log(data)
      Relationship.create({
         ...data,
         first_id: user_one_id,
      }).then(x => {
         console.log(`Successfully created friend request between ${x.user_one_id} and ${x.user_two_id}`);
         return res.send(x);
      })
   }
   catch (err) {
      console.log(err)
   }
});

// Accept a friendship request
// user_one accepts user_two's request (:userId === user_two_id)
router.put("/:userId", (req, res) => {
   console.log("yes")
});

// Fetch all pending requests where you are the accepter/requester
router.get("/pending/:userId", (req, res) => {
   console.log("yes")
});

// Fetch all of your connections
router.get("/connections/:userId", (req, res) => {
   console.log("yes")
});

module.exports = router;