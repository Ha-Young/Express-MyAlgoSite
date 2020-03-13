const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

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
      err.status = 500;
      err.message = 'Internal Server Error';
      next(err);
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
    err.status = 500;
    err.message = 'Internal Server Error';
    next(err);
  }
});
