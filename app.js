const express = require('express');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const problemsRoutes = require('./routes/problems');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const problem = require('./models/Problem');

require('./config/passport-setup');
require('dotenv').config();
const SESSION_COOKIE_KEY = process.env.SESSION_COOKIE_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [SESSION_COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGODB_URI, () => {
  console.log('connected to mongodb');
});

app.use('', authRoutes);
app.use('/profile', profileRoutes);
app.use('/problems', problemsRoutes);

app.get('/', async (req, res) => {
  const problems = await problem.find({});
  res.render('home', { user: req.user, problems });
});

app.listen(3000, () => {
  console.log('app now listening for requests on port 3000');
});

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { user: req.user });
});

module.exports = app;
