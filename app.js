require('dotenv').config();
const express = require('express');
const session = require('express-session');

const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const GitHubStrategy = require('passport-github').Strategy;

const index = require('./routes/index');
const User = require('./models/User');

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}, function (accessToken, refreshToken, profile, cb) {
  const existingUser = User.findOne({ githubId: profile.id },
    function (err, user) {
      return cb(err, user);
    }
  );

  if (!existingUser) {
    User.save({ githubId: profile.id });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

app.get('/', authenticateUser, index);
app.get('/login', index);
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/' })
);

app.get('/problem/:problem_id', index);
app.post('/problem/:problem_id', index);

app.use(function(req, res, next) {
  next(createError(404, 'Not Found'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected!');
});
