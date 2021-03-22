const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (user === null) {
      return done(null, false, { message: "unknown email" });
    }

    try {
      const hasUser = await bcrypt.compare(password, user[0].password);

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

  passport.serializeUser((user, done) => done(null, user[0].id));
  passport.deserializeUser(async (id, done) => done(null, await getUserById(id)));
}

module.exports = initialize;
