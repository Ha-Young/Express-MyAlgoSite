require("dotenv").config();
require(`${__dirname}/database/atlas.js`);
require(`${__dirname}/authentication/passport`);

const express = require('express');
const fs = require("fs");
const createError = require("http-errors");

const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");

const logStream = fs.createWriteStream(`${__dirname}/log/app.log`, { flags: "a" });

app.use(morgan("combined", { stream: logStream }));
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

const redirectByUnAuth = require(`${__dirname}/middlewares/redirectByUnAuth`);

const index = require(`${__dirname}/routes`);
const login = require(`${__dirname}/routes/login`);
const upload = require(`${__dirname}/routes/upload`);
const problems = require(`${__dirname}/routes/problems`);
const logout = require(`${__dirname}/routes/logout`);

app.use("/login", login);
app.use(redirectByUnAuth);
app.use("/upload", upload);
app.use("/", index);
app.use("/problems", problems);
app.use("/logout", logout);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  return res.render('error');
});

module.exports = app;
