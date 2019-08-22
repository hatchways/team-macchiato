const express = require("express");
const router = express.Router();
const User = require("../models").User;
const passport = require("passport");

router.get("/", function(req, res, next) {
  try {
    User.findAll().then(users => {
      res.send(users);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // console.log(req.user.id);
      const user = await User.findByPk(req.user.id);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);
module.exports = router;
