const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./../models/User");
const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "해당하는 유저가 없습니다" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "비밀번호가 틀렸습니다" });
      }
    } catch (err) {
      return done(err);
    }
  };

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
    return done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    return User.findOne({ _id: id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
}

module.exports = initialize;
