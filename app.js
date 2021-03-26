require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const createError = require("http-errors");
const passport = require("passport");
const mongoose = require("mongoose");

const users = require("./routes/users");
const index = require("./routes/index");
const problems = require("./routes/problems");
const { create } = require("./models/User");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.engine(".html", require("ejs").__express);
app.set("view engine", "ejs");

app.use(express.static("public"));

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: "mydatabase"
});

app.use(session({
  name: "authkey",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", users);
app.use("/", index);
app.use("/problems", problems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = createError(404, "Not Found");
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

debugger;

module.exports = app;
