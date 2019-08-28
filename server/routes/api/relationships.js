const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const passport = require("passport");
const Project = require("../../models").Project;
const Skill = require("../../models").Skill;
const Relationship = require("../../models").Relationship;
const Sequelize = require("sequelize");
const { or } = Sequelize.Op;

const PENDING = 0
const ACCEPTED = 1
const DECLINED = 2
// const BLOCK = 3      // Unused

// Send a friendship request
router.post(
   "/:targetUserId",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      try {
         const init_id = req.user.id
         const target_id = req.params.targetUserId

         // Check if relationship already exists between two users
         Relationship.findOne({
            where: {
               [or]: [
                  {
                     requester_id: init_id,
                     requestee_id: target_id,
                  },
                  {
                     requester_id: target_id,
                     requestee_id: init_id,
                  }
               ]
            }
         }).then(rel => {

            // Relation already exists between two users
            if (rel) {
               console.log(`A friend request between ${rel.requester_id} and ${rel.requestee_id} already exists`)
               return res.status(400).json({ error: `A friend request between ${rel.requester_id} and ${rel.requestee_id} already exists` })
            }

            // If no relationship exists, continue on with creating a request
            let data = {
               requester_id: init_id,
               requestee_id: target_id,
               status: PENDING,
            };

            Relationship.create(data)
               .then(rel => {
                  console.log(`Successfully created friend request between ${rel.requester_id} and ${rel.requestee_id}`);
                  return res.send(rel);
               })
         })
      } catch (err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
);

// Accept a friendship request
router.put(
   "/:userId",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      try {
         const accepterId = req.user.id;
         const requesterId = req.params.userId  // /:userId is the friend request to accept

         Relationship.findOne({
            where: {
               requester_id: requesterId,
               requestee_id: accepterId,
               status: PENDING,
            }
         }).then(rel => {
            // If a friend request does not exist
            if (!rel) {
               console.log(`Friend request from ${requesterId} to ${accepterId} DOES NOT EXIST`)
               return res.status(400).json({ error: `Friend request from ${requesterId} to ${accepterId} DOES NOT EXIST` })
            }
            rel.update({ status: ACCEPTED })
               .then(rel => {
                  console.log(`${rel.requestee_id} has accepted friend request from ${rel.requester_id}!`);
                  return res.send(rel)
               })
         })
      } catch (err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
);

// Fetch all pending requests where you are the accepter/requester
router.get(
   "/pending",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      try {
         const userId = req.user.id;

         Relationship.findAll({
            where: {
               status: PENDING,
               [or]: [
                  { requester_id: userId },
                  { requestee_id: userId },
               ]
            }
         }).then(rel => {
            return res.send(rel)
         })
      } catch (err) {
         console.log(err)
         res.status(500).send(err)
      }
   }
);

// Fetch all of your connections
router.get(
   "/connections",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      try {
         const userId = req.user.id;
         Relationship.findAll({
            where: {
               status: ACCEPTED,
               [or]: [
                  { requester_id: userId },
                  { requestee_id: userId },
               ]
            }
         }).then(rel => {
            return res.send(rel)
         })
      } catch (err) {
         console.log(err);
         res.status(500).send(err)
      }
   }
);

module.exports = router;
