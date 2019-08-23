const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require("passport");
const User = require("../models").User;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromHeader("authorization"),
      secretOrKey: process.env.SECRET
    },
    async (payload, done) => {
      try {
        const user = await User.findByPk(payload.user.id);

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(error, false);
      }
    }
  )
);
