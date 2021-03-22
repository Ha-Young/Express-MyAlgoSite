const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressEjsLayouts = require("express-ejs-layouts");
const fs = require("fs");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const globalRouter = require("./routes/globalRouter");
const { localMiddleware } = require("./middlewares");
const passport = require("./passport");
const session = require('express-session');
require("dotenv").config();

const app = express();

app.set('layout', path.join('layouts/main'));
app.set("layout extractScripts", true);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());
app.use(morgan("dev"));
app.use(morgan("combined", {
  stream: fs.createWriteStream(path.join(__dirname, "app.log"), { flags: "a" }),
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(expressEjsLayouts);

app.use(session({
  secret: process.env.SECRET_CODE,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use("/", globalRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "ERROR" });
});

module.exports = app;
