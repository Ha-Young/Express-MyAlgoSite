const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const logger = require("morgan");

const passport = require("./passport");

const index = require("./routes/index");
const login = require("./routes/login");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: true,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: parseInt(process.env.MAX_AGE),
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/login", login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "Not Found"));
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
