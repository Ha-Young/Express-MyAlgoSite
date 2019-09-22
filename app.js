const express = require('express');
require('dotenv').config();

const index = require('./routes/index');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const problemRoutes = require('./routes/problem-routes');

require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up template engine to use
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(
  keys.mongodb.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to mongodb');
  }
);

// set up routes
app.use('/', index);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/problem', problemRoutes);

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
  err.status = err.status || 500;
  res.status(err.status || 500);
  res.render('error', {
    user: req.user || undefined,
    message: err.message,
    error: err,
  });
});

module.exports = app;
