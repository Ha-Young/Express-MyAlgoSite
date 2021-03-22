require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const verifyUser = require('./routes/middlewares/verifyUser');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connection sucessful👍🏻'))
  .catch(err => console.log(err));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    function (token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  )
);

const index = require('./routes/index');
const login = require('./routes/login');
const auth = require('./routes/auth');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());

app.use(passport.initialize());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use('/', verifyUser, index);
app.use('/login', login);
app.use('/auth', auth);

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
