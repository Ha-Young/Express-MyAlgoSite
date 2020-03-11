const path = require('path');
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const index = require('./routes/index');
const problems = require('./routes/problems');

const app = express();

mongoose.connect("mongodb://localhost:27017/codewars", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', index);
app.use('/problem', problems);

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
