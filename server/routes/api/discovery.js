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
  console.log(name === "undefined" ? "true" : "not true");
  console.log(req.query);
  console.log(isEmptyObj(req.query));
  console.log(req.query);
  try {
    User.findAll({
      include: [{ all: true }]
    }).then(users => {
      if (name != "undefined") {
        let filter = users.filter(user =>
          user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        );

        return res.send(filter);
      } else {
        return res.send(users);
      }
    });
    // SELECT * FROM Users WHERE name = "Daniel"
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
