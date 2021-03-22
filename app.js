const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");

const index = require("./routes/index");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "Not Found"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
