const express = require("express");
const router = express.Router();
const User = require("../../models").User;
const User = require("../../models").Project;

router.get('/', async (req, res) => {
  User.findAll({
    include: [{model: Project}]
  }).then(users => {

  })
})
module.exports = router
