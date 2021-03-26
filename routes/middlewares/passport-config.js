const User = require("../../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const initialize = (passport) => {
  const customFields = {
    usernameField: "userId",
    passwordField: "userPassword",
  };

  const authenticateUser = async (id, password, done) => {
    const user = await User.findOne({ userId: id });

    if (user === null) {
      done(null, false, { message: "You're not our member" });
      return;
    }

    try {
      if (await bcrypt.compare(password, user.userPassword)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      done(createError(500, "Internal Server Error"));
    }
  }

  passport.use(new LocalStrategy(customFields, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(createError(500, "Internal Server Error"));
    }
  });
}

module.exports = initialize;
