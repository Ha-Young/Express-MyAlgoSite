const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");
const { jwtSecret } = require("../config");

const JWTStrategy = passportJWT.Strategy;

const cookieExtractor = req => {
  let jwt = null;
  if (req && req.cookies) {
    jwt = req.cookies["jwtToken"];
  }

  return jwt;
};

// Todo. Service로 빼기.
module.exports = ({ app }) => {
  app.use(passport.initialize());

  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, done) {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done({
              message: "Not existed email.",
            }, false);
          }

          if (!await user.comparePassword(password)) {
            return done({
              message: "Incorrect password.",
            }, false);
          }

          return done(null, user, { message: "Logged In Successfully" });
        } catch (err) {
          done(err);
        }
      }
    )
  );

  //JWT Strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: jwtSecret,
        passReqToCallback: true,
      },
      async function (req, jwtPayload, done) {
        try {
          // toDo. jwtPayload가 그냥 _id가 될 수 있도록!
          const user = await User.findById(jwtPayload._id);

          if (!user) {
            return done({
              message: "Incollected json web token",
            }, false);
          }

          req.user = user;
          return done(null, user);

        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
