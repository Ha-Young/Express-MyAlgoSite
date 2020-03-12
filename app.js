require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const index = require('./routes/index');
const auth = require('./routes/auth');
const problems = require('./routes/problems');
const User = require('./models/User');

const app = express();

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
async function(accessToken, refreshToken, profile, cb) {
  const user = await User.findById(profile.id);
  if (user) {
    cb(null, user);
  } else {
    const newUser = new User({
      ...profile,
      _id: profile.id,
      avatar_url: profile.photos[0].value
    });
    await newUser.save();
    cb(null, newUser);
  }
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', index);
app.use('/auth', auth);
app.use('/problem', problems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
