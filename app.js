const express = require('express');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const problemsRoutes = require('./routes/problems');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const problem = require('./models/Problem');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, () => {
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
