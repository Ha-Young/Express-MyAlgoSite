const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./util/dbConnect');
dbConnect();
const index = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const problems = require('./routes/problems');

const checkSession = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect('/login');
};
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/login', login);
app.use(checkSession);
app.use('/', index);
app.use('/problems', problems);
app.use('/logout', logout);
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  if (err instanceof mongoose.Error && req.app.get('env') !== 'development') err.message = 'Internal Error';
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
