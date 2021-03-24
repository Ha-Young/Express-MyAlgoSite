require("dotenv").config();
require("./dbInit");
require("./passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");

const index = require("./routes/index");
const problems = require("./routes/problemsRouter");

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("./public"));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },
}));
app.use(passport.initialize());
app.use(passport.session());

// router
app.use("/", index);
app.use("/problem", problems);

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
