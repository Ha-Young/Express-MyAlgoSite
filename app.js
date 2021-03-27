const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  require("dotenv").config();
}

const express = require("express");
const { format } = require("date-fns");
const createError = require("http-errors");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const path = require("path");
const methodOverride = require("method-override");
const morgan = require("morgan");

const { stream, logger } = require("./config/winston");
const initializeDB = require("./config/db");
const initializePassport = require("./loader/passport");

const app = express();

initializeDB();
initializePassport();

app.use(morgan("common", { stream }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use(require("./routes"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "Not Found Error"));
});

app.use(function(err, req, res, next) {
  const errorInfo = {
    req: {
      headers: req.headers,
      query: req.query,
      body: req.body,
      route: req.route,
    },
    error: {
      message: err.message,
      stack: err.stack,
      status: err.status,
    },
    user: req.user,
  };

  logger.error(format(new Date(), "yyyy-MM-dd HH:mm:SS"), errorInfo);

  next(err, req);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { err });
});

module.exports = app;
