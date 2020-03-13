import passport from 'passport';
import GithubStrategy from 'passport-github';
import User from '../models/User';

export default () => {
  passport.use(new GithubStrategy.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET_KEY,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, cb) => {
    const { id, email, name } = profile._json;

    try {
      const user = await User.findOne({ email });
      if (user) return cb(null, user);

      const newUser = await User.create({ githubId: id, email, name });
      return cb(null, newUser);
    } catch (error) {
      return cb(error);
    }
  }));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
