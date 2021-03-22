const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const dotenv = require("dotenv");
dotenv.config();

let UserModel = require("../models/User");
require("dotenv").config();

module.exports = () => {
  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
        return UserModel.findOne({
          where: { email: email, password: password },
        })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "Incorrect email or password.",
              });
            }
            return done(null, user, { message: "log in sucess!" });
          })
          .catch((err) => done(err));
      }
    )
  );

  //JWT Strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
      },
      function (jwtPayload, done) {
        return UserModel.findOneById(jwtPayload.id)
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );
};
