const express = require("express");
const router = express.Router();
const User = require("../models").User;

router.get("/", function(req, res, next) {
  try {
    User.create({
      name: "DangAsian",
      email: "dan.justin.ang@gmail.com"
    }).then(user => {
      console.log(user);
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
