require('dotenv').config();

require("./loader/db");
require("./loader/passport");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const path = require("path");

const global = require("./routes/global");
const join = require("./routes/join");
const problem = require("./routes/problem");
const db = require('./loader/db');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set('view engine', "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.use(expressLayouts);

app.set("layout", "layout");

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 },
  store: new MongoStore({
    mongooseConnection: db,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", global);
app.use("/join", join);
app.use("/problems", problem);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  if (err instanceof mongoose.CastError) {
    err.message = "Internal Server Error";
    err.status = 500;
    err.stack = null;
  }

  // set locals, only providing error in development
  res.locals.message = err.message || "Internal Server Error";
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
