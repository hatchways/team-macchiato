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
               // Allows declined invites to be re-sent
               [or]: [
                  { status: PENDING },
                  { status: ACCEPTED }
               ],
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
         const accept = req.body.accept

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
            let status = accept ? ACCEPTED : DECLINED
            rel.update({ status })
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

router.get(
   "/:userId",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      try {
         const userId = req.user.id
         const userId2 = req.params.userId;

         Relationship.findOne({
            where: {
               [or]: [
                  { 'requester_id': userId, 'requestee_id': userId2 },
                  { 'requestee_id': userId, 'requester_id': userId2 },
               ]
            }
         }).then(rel => {
            res.send(rel)
         })
      } catch (err) {
         res.status(500).send(err)
      }
   }
);

// Fetch all pending requests where you are the accepter/requester
//  Returns user data of matching
const fetchAllWhere = (status, option) => (req, res) => {
   try {
      const userId = req.user.id

      Relationship.findAll({
         where: {
            status: status,
            ...option(userId)
         }
      }).then(rel => {
         User.findAll({
            where: {
               [or]: rel.map(r => { return { id: r.requester_id } })
            },
            include: [
               {
                  model: User,
                  as: 'requestee',
                  attributes: ['id'],
                  through: {
                     // where: {
                     //    status: PENDING,
                     //    requestee_id: userId
                     // }
                     attributes: ['createdAt']
                  }
               }
            ],
            attributes: ['id', 'name'],
         }).then(data => {

            return res.send(data)
         })
      })
   } catch (err) {
      res.status(500).send(err)
   }
}
// Where user is the accepter
router.get(
   "/pending",
   passport.authenticate("jwt", { session: false }),
   fetchAllWhere(PENDING, userId => { return { 'requestee_id': userId } })
);
// Where user is the requester
router.get(
   "/pending/req",
   passport.authenticate("jwt", { session: false }),
   fetchAllWhere(PENDING, userId => { return { 'requester_id': userId } })
);

// Fetch all of your connections
router.get(
   "/connections",
   passport.authenticate("jwt", { session: false }),
   fetchAllWhere(ACCEPTED, userId => {
      return {
         '[or]': [
            { 'requester_id': userId },
            { 'requestee_id': userId }
         ]
      }
   })
);

module.exports = router;
