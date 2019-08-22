const express = require("express");
const router = express.Router();
const User = require("../models").User;

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
