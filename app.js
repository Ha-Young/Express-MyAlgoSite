const express = require('express');
const morgan = require('morgan');
const createError = require("http-errors");

const index = require('./routes/index');
const { logger, stream } = require("./loader/logger");

var app = express();

app.use(morgan("combined", { stream }));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
