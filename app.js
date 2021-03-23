const express = require("express");
const path = require("path");
const passport = require("passport");
// const bodyParser = require("body-parser");

const index = require("./routes/index");
const login = require("./routes/login");
const logout = require("./routes/logout");
const problems = require("./routes/problems");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/login", login);
app.use("/logout", logout);
app.use("/problems", problems);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
