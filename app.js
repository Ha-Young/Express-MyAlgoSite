require('dotenv').config();

const express = require('express');
const path = require('path');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');

const login = require('./routes/login');
const index = require('./routes/index');
const problems = require('./routes/problems');
const errors = require('./lib/errors');
const User = require('./models/User');
const Problem = require('./models/Problem');

mongoose.connect(process.env.DB_ADDRESS, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected!');

  // This is included only for the convenience of reviewers,
  // and can be excluded in the live production.
  const storeSampleProblems = async () => {
    try {
      const hasProblems = await Problem.countDocuments({}).exec();
      if (hasProblems) return;

      const sampleProblems = require('./models/sample_problems.json');

      if (!Array.isArray(sampleProblems) || !sampleProblems.length) {
        throw new Error('Invalid [sampleProblems.json] file');
      }

      for (let i = 0; i < sampleProblems.length; i++) {
        await new Problem(sampleProblems[i]).save();
      }
      console.log('Stored sample problems in DB');
    } catch (err) {
      throw new errors.GeneralError(err);
    }
  }
  storeSampleProblems();
});

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `http://${process.env.HTTP_HOST}/login/github/callback`
  },
  async function(accessToken, refreshToken, profile, cb) {
    async function findOrCreateUser(profile, cb) {
      try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          try {
            user = new User({
              githubId: profile._json.id,
              name: profile._json.name,
              avatarUrl: profile._json.avatar_url
            });
            await user.save();
          } catch (err) {
            throw new Error('Error occured while creating a user \n' + err);
          }
        }
        return cb(null, user);
      } catch (err) {
        return next(
          new errors.GeneralError(err)
        );
      }
    }
    return await findOrCreateUser(profile, cb);
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat', resave: true,
  saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', login);
app.use('/problems', problems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return next(
    new errors.PageNotFoundError(req.originalUrl)
  );
});

// error handler
app.use(function(err, req, res, next) {
  err.status = err.status || 500;
  res.status(err.status).render('error', { err });
});

module.exports = app;
