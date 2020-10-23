const express = require('express');
const index = require('./routes/index');
const path = require("path");
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('express-flash');
require('dotenv').config();
const MONGO_URI = process.env.MONGOURI;
const SESSION_SECRET = process.env.SESSION_SECRET;

try {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  next(err);
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);

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
  res.locals.error.status = err.status;
  res.render('error');
});

module.exports = app;
