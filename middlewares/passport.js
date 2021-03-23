const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/User");

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    return null;
  }
};

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  }

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => { });
  passport.deserializeUser((id, done) => { });
}

module.exports = initialize;
