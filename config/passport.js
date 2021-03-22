const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const dotenv = require("dotenv");
dotenv.config();

const UserModel = require("../models/User");
require("dotenv").config();

module.exports = () => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      function (email, password, done) {
        return UserModel.findOne({ email: email, password: password })
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
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
      },
      function (jwtPayload, done) {
        console.log("jwt payload", jwtPayload);

        return UserModel.findById(jwtPayload._id)
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
