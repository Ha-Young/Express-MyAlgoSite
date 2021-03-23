if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");

const index = require("./routes/index");
const auth = require("./routes/auth");
const problems = require("./routes/problems");
const editor = require("./routes/editor");

const { checkAuthenticated } = require("./middlewares/auth");

const app = express();

const mongoDB = process.env.MONGO_URL;

mongoose.connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log("mongoDB connected!"))
  .catch(() => console.log("ERROR! can't connect mongoDB!"));

app.set("view engine", "ejs");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/auth", auth);
app.use("/problems", problems);
app.use("/editor", editor);
app.use("/", checkAuthenticated, index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
