const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");

const passportConfig = require("./config/passport");

const index = require("./routes/index");
const auth = require("./routes/auth");
const problems = require("./routes/problems");

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);

app.set("layout", "layout");
app.set("layout extractScripts", true);

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  },
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/auth", auth);
app.use("/", index);
app.use("/problems", problems);

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
