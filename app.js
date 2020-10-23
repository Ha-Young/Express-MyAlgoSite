const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const dbConnection = require("./mongodb");
const passport = require("./passport/github");
const router = require("./routes/index");
const { MongoError } = require("./service/error");

const app = express();

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");

  app.use(morgan());
} else if (process.env.NODE_ENV === "production") {
  const compression = require("compression");
  const helmet = require("helmet");

  app.use(compression());
  app.use(helmet());
}

dbConnection.once("open", (err) => {
  if (err) throw MongoError("mongodb can not connect");

  console.log("mongodb is connected...");
});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.use(function(req, res, next) {
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
