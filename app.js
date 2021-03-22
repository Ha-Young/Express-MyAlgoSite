require("dotenv").config();

const { ROOT_DIR_NAME } = require(`${__dirname}/constants/constants`);

const express = require('express');
const morgan = require("morgan");
const fs = require("fs");

const index = require(`${ROOT_DIR_NAME}/routes`);

const app = express();

app.set("view engine", "ejs");

const logStream = fs.createWriteStream(`${ROOT_DIR_NAME}/log/app.log`, { flags: "a" });

app.use(morgan("combined", { stream: logStream }));
app.use(express.static("public"));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
