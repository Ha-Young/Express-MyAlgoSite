const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const User = require('./models/User');
const errors = require('./lib/error');

passport.use(new GitHubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.GH_CALLBACK_URL
  },
  async function (_, __, profile, cb) {
    let user;
    const { _json: { id } } = profile;

    try {
      user = await User.findOne({ githubId: id });

      if(!user) {
        user = await User.create({
          githubId: id
        });
        await User.save();
      }
    } catch (err) {
      next(new errors.GeneralError(err.message));
    }
    cb(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (err) {
    next(new errors.GeneralError(err.message));
  }
});
