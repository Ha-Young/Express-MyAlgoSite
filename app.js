const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database successfully');
  }
});

const index = require('./routes/index');
const authRoutes = require('./routes/auth-routes');
const passportSetup= require('./config/passport-setup');

const bodyParser = require('body-parser');
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());

app.use('/', index);
app.use('/auth', authRoutes);

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
