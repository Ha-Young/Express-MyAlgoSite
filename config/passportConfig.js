const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./../models/User");
const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };
  console.log("initialize passport");

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true,
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    console.log(user._id);
    console.log("serialize");
    return done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    console.log("deserialize");
    return User.findOne({ _id: id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
}

module.exports = initialize;
