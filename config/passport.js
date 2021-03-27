const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const User = require("../models/User");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

module.exports = () => {
  passport.use(new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).select("+password");
        const correct = await user?.correctPassword(password, user.password);

        if (!email || !password) {
          return done(null, false, { message: "provide email and password." });
        }

        if (!user || !correct) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        return done(null, user, { message: "Logged In successfully." });
      } catch (err) {
        return done(err);
      }
    },
  ));

  passport.use(new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOneById(jwtPayload.id);

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ));

  passport.use(new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://sungjin-vaco-codewars.herokuapp.com/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          githubId: profile.id,
        });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            githubId: profile.id,
            profileUrl: profile.profileUrl,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ));

  passport.serializeUser((user, done) => {
    done(null, { id: user._id, name: user.name });
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
