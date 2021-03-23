if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const index = require("./routes/index");
const login = require("./routes/login");
const createAccount = require("./routes/createAccount");
const problems = require("./routes/problems");
const initializePassport = require("./middlewares/passport");
const checkAuth = require("./middlewares/checkAuthenticated");

const app = express();

/*
  dbUser / vanillacoding
  mongodb+srv://dbUser:vanillacoding@cluster0.hugiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/

mongoose.connect(
  process.env.DB_ADDRESS,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
);
const db = mongoose.connection;
db.on("error", (err) => console.error(`DB connection Error : \n${err}`));
db.once("open", () => console.log("Connected"));

initializePassport(passport);

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/login", checkAuth.checkNotAuthenticated, login);
app.delete("/logout", (req, res, next) => {
  req.logOut();
  res.redirect("/login");
});
app.use("/create_account", checkAuth.checkNotAuthenticated, createAccount);
app.use("/problems", problems);
app.use("/", checkAuth.checkAuthenticated, index);

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
