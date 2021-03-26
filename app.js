require('dotenv').config();

require("./loader/db");
require("./loader/passport");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

const path = require("path");

const global = require("./routes/global");
const join = require("./routes/join");
const problem = require("./routes/problem");
const db = require('./loader/db');

const { ErrorHandler } = require("./util/error");

const { ERROR } = require("./constants/constants");

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
  next(new ErrorHandler(404, ERROR.NOT_FOUND));
});

app.use(function(err, req, res) {
  res.locals.message = err.message || ERROR.INTERNAL_SERVER_ERROR;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
