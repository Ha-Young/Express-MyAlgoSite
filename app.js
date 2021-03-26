require("dotenv").config();

const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const createError = require("http-errors");
const configs = require("./config");

require("./config/passport");

const mongoose = require("mongoose");
const DB = configs.serverAddress.replace("<password>", configs.password);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("server connect!!"));

const db = mongoose.connection;

db.on("error", () => console.log("error"));
db.once("open", () => console.log("connect!!!"));

const index = require("./routes/index");
const problems = require("./routes/problems");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: configs.secretCode,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/problems", problems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "Not Found"));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
