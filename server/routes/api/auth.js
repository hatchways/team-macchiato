const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models").User;
const { check, validationResult } = require("express-validator");
// @route   POST /api/auth/register
// @desc    Register Route
// @access  Public
router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email must be valid").isEmail(),
    check("password", "Password length must be more than 6 characters")
      .isLength({ min: 6 })
      .not()
      .isEmpty()
  ],
  async (req, res, next) => {
    // initialize errors here..
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // Check to see if email is present...
      let user = await User.findOne({
        where: {
          email: email
        }
      });

      if (user) {
        console.log(user);
        res.status(400).json({ error: "Email already exists" });
        // throw new Error(err.message);
      }

      // User object is created with the relevant infomration from the req.body
      user = {
        name,
        email,
        password
      };

      // bcrypt allows you to hash the password by using a generated salt.
      // This allows for encryption of password (security reasonings).
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Create a user with the given properties, and create a payload
      // The payload will be accesible when decyphering the jwt-token
      await User.create(user).then(x => {
        const payload = {
          user: {
            id: x.id,
            name,
            email
          }
        };

        // JWT token generation
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, user: payload.user });
          }
        );
      });
    } catch (err) {
      // res.status(500).send("server error");
      throw new Error(err.message);
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login Route
// @access  Public

router.post("/login", async (req, res, next) => {
  // initialize errors here..

  const { email, password } = req.body;
  try {
    // Check Email..
    let user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      res.status(404).json({ error: "Invalid credentials" });
    }

    // Check password against db password
    const isMatch = await bcrypt.compare(password, user.password);

    // Error if isMatch is false (stranger danger)
    if (!isMatch) {
      res.status(404).json({ error: "Invalid credentials" });
    }

    // Payload (includes the necessary user details)
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email
      }
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, user: payload.user });
      }
    );

    console.log(payload);
    // if match then we send Jwt token
  } catch (err) {
    // res.status(500).send("server error");
    throw new Error(err.message);
  }
});

module.exports = router;
