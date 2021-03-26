const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVICE_URL}/login/google/callback`,
  },
  async function(accessToken, refreshToken, profile, cb) {
    const {
      _json: { name, email },
    } = profile;

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        const newUser = User({
          email,
          name,
          password: "",
          isGoogle: true,
          isGithub: false,
          exprience_point: 0,
          kyu: 8,
          problems: [],
        });

        await User.create(newUser);
        return cb(null, newUser);
      }

      if (email === user.email && user.isGoogle) {
        return cb(null, user);
      }
    } catch (err) {
      cb(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
