const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

async function getUserByEmail(email) {
  return await User.find({ email });
}

async function getUserById(id) {
  return await User.findById(id);
}

function initialize() {
  async function authenticateUser(email, password, done) {
    try {
      const [ user ] = await getUserByEmail(email);

      if (user === null) {
        return done(null, false, { message: "unknown email" });
      }

      const hasUser = await bcrypt.compare(password, user.password);

      if (hasUser) {
        return done(null, user);
      }

      return done(null, false, { message: "wrong password" });
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({
    usernameField: "email",
  }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      return done(null, await getUserById(id));
    } catch (error) {
      return done(error, null, { message: "Error failed to find user" });
    }
  });
}

module.exports = initialize;
