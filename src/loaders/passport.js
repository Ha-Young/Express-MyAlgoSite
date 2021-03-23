const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");
const { jwtSecret } = require("../config");

const JWTStrategy = passportJWT.Strategy;

const cookieExtractor = req => {
  let jwt = null;
  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};

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

          if (!user || await !user.comparePassword(password)) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }

          return done(null, user, { message: "Logged In Successfully" });
        } catch (error) {
          done(error);
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
      },
      function (jwtPayload, done) {
        return User.findOneById(jwtPayload.id)
          .then(user => {
            return done(null, user);
          })
          .catch(err => {
            return done(err);
          });
      }
    )
  );
};
