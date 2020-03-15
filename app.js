const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');

const index = require('./routes/index');
const auth = require('./routes/auth');
const problems = require('./routes/problems');
const keys = require('./config/keys');
require('./config/passport-setup');

const app = express();

mongoose.connect('mongodb://localhost/codewars', { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database successfully');
  }
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', auth);
app.use('/problems', problems);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
