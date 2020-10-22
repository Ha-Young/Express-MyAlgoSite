require('./db');
const passport = require('passport');
const express = require('express');
const session = require('express-session')
const createError = require('http-errors');
const login = require('./routes/login');
const index = require('./routes/index');
const problems = require('./routes/problems');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./routes/models/User');
require('dotenv').config();

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/auth/google/callback'
  }, async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    const userId = profile.id;
    const email = profile.emails[0].value;
    const photo = profile.photos[0].value;
    const provider = profile.provider;
    const newUser = {
      userId,
      email,
      photo,
      provider
    };

    try {
      const user = await User.findOne({ email: email }).exec();
      if (user) {
        return done(null, user);
      } else {
        await User(newUser).save();
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    await User.findOne({ email: user.email }, (err, user) => {
      done(null, user);
    });
  } catch (err) {
    done(err)
  }
});


app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', require('express-ejs-extend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', login);
app.use('/problem', problems);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, `Can't find ${req.originalUrl} on this server!`));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
