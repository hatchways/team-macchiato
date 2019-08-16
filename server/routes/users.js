const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = db.import("../models/user");

router.get("/", function(req, res, next) {
  try {
    User.findAll().then(users => {
      res.send(users);
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
