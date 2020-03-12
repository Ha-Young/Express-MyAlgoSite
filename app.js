require('dotenv').config();

const express = require('express');
const path = require('path');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const index = require('./routes/index');
const problems = require('./routes/problems');
const User = require('./models/User');
const Problem = require('./models/Problem');
const errors = require("./lib/errors");
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_ADDRESS, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected!');
  const storeSampleProblems = async () => {
    try {
      const hasProblems = await Problem.countDocuments({}).exec();
      if (hasProblems) return;

      const sampleProblems = require('./models/sample_problems.json');

      if (!Array.isArray(sampleProblems) || !sampleProblems.length) {
        throw new errors.GeneralError('Invalid [sampleProblems.json] file');
      }

      for (let i = 0; i < sampleProblems.length; i++) {
        await new Problem(sampleProblems[i]).save();
      }
      console.log('Stored sample problems in DB');
    } catch (err) {
      throw new errors.GeneralError(err.message);
    }
  }
  storeSampleProblems();
});

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/github/callback"
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
            throw new Error('Error occured while creating a user');
          }
        }
        return cb(null, user);
      } catch (err) {
        next(
          new errors.GeneralError(err.message)
        )
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
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

app.get('/login', (req, res, next) => {
  // console.log(' I AM HERE LOGIN ');
  res.render('login');
});

app.get('/login/github',
  passport.authenticate('github'));

app.get(
  '/login/github/callback',
  passport.authenticate('github', { failureRedirect: '/login'}),
  (req, res) => res.redirect('/')
);

app.use('/problems', problems);


app.get('/error', (req, res, next) => {
  const error = req.session.error;
  res.render('error', { error });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return next(
    new errors.PageNotFoundError('Page Not Found')
  );
});

// error handler
app.use(function(err, req, res, next) {
  console.log("I AM HERE ERROR");
  err.status = err.status || 500;
  req.session.error = err;
  res.status(err.status).redirect('/error');
});

module.exports = app;
