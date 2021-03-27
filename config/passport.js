const passport = require("passport");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

dotenv.config();

const UserModel = require("../models/User");

const extractCookie = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};

module.exports = () => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      async function (email, password, done) {
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            return done(null, false);
          }

          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: extractCookie,
        secretOrKey: process.env.JWT_SECRET_KEY,
        session: false,
      },
      async function (jwtPayload, done) {
        try {
          const user = await UserModel.findById(jwtPayload._id);

          try {
            if (!user) {
              return done(null, false);
            }

            return done(null, user);
          } catch (error) {
            return done(error);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
