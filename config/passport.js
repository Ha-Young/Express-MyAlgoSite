const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

function getUserByEmail(email) {
  return User.find({ email });
}

function getUserById(id) {
  return User.findById(id);
}

function initialize() {
  async function authenticateUser(email, password, done) {
    const [ user ] = await getUserByEmail(email);
    
    if (user === null) {
      return done(null, false, { message: "unknown email" });
    }

    try {
      const hasUser = await bcrypt.compare(password, user.password);

      if (hasUser) {
        return done(null, user);
      } else {
        return done(null, false, { message: "wrong password" });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({
    usernameField: "email",
  }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => done(null, await getUserById(id)));
}

module.exports = initialize;
