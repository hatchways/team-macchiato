const express = require("express");
const router = express.Router();
// var pg = require("pg");
const User = require("../../models").User;
const Project = require("../../models").Project;

// Helper function (will place somewhere else)
const isEmptyObj = object =>
  !Object.getOwnPropertySymbols(object).length &&
  !Object.getOwnPropertyNames(object).length;

// @route   GET /api/discovery
// @desc    Route that fetches all Users(n=...)within the platform
// @access  Public
router.get("/", async (req, res) => {
  const { name } = req.query;
  console.log(req.query);
  console.log(isEmptyObj(req.query));
  console.log(req.query);
  try {
    if (req.query) {
      User.findAll({
        where: {
          name: name
        }
      }).then(users => {
        return res.json(users);
      });
    }

    User.findAll({
      include: [{ all: true }]
    }).then(users => {
      return res.json(users);
    });
    // SELECT * FROM Users WHERE name = "Daniel"
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
