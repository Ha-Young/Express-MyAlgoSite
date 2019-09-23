const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const index = require('./routes/index');
const loginRoutes = require('./routes/login');
const problemsRoutes = require('./routes/problems');
const mongoose = require('mongoose');
require('./config/passport');
require('dotenv').config();

const SESSION_COOKIE_KEY = process.env.SESSION_COOKIE_KEY;
const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(
  DATABASE_URI,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  () => {
    console.log('connected to mongodb');
  }
);

const app = express();
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [SESSION_COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/', index);
app.use('/login', loginRoutes);
app.use('/problems', problemsRoutes);

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
