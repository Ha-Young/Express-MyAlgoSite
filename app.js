require("dotenv").config({ path: "./.env"});
require("./config/mongoDB")
require("./config/passport/googlePassport");

const express = require("express");
const morgan = require("morgan");
const mongoSession = require("./config/mongoDB/session");
const passport = require("passport");
const path = require("path");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const home = require("./routes/home");
const login = require("./routes/login");
const logout = require("./routes/logout");
const problems = require("./routes/problems");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use(mongoSession);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", home);
app.use("/login", login);
app.use("/logout", logout);
app.use("/problems", problems);

app.use(function(req, res, next) {
  next(createError(404, "Page Not Found"));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error", { err });
});

module.exports = app;
