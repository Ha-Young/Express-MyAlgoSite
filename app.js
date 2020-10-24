if (process.env.NODE_ENV === "development") require("dotenv").config();
require("./mongodb");

const express = require("express");
const app = express();

const passport = require("./passport/github");
const middleware = require("./middleware");
const router = require("./routes/index");

middleware.set(app);
passport.set(app);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(router);

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
