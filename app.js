require("dotenv").config();
const express = require("express");
const app = express();

const index = require("./routes/index");
const level = require("./routes/level");
const login = require("./routes/login");
const logout = require("./routes/logout");
const problem = require("./routes/problem");
const { requiresLogin } = require("./routes/middlewares/requiresLogin");

const passport = require("passport");
const session = require("express-session");

const mongoose = require("mongoose");
const db = mongoose.connection;

const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://hyeongju:WwHdtPxR6b-PibR@codewars.zwtye.mongodb.net/myFirstDatabase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", function () {
  console.log("Connected to mongod server");
});

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: "hyeongju",
  resave: false,
  saveUninitialized: true
}));

app.use("/", index);
app.use("/level", level);
app.use("/login", login);
app.use("/logout", logout);
app.use("/problems", problem);

app.use(requiresLogin, function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
