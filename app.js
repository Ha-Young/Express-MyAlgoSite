require("dotenv").config();
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const keys = require("./config/keys");
const index = require("./routes/index");
const login = require("./routes/login");
const problem = require("./routes/problem");
const app = express();

require("./config/passport");
require("./config/db");
app.use(session({ secret: keys.session.KEY, cookie: { maxAge: 60000 } }));
app.use(express.urlencoded());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public")));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/login", login);
app.use("/problem", problem);


app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
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
