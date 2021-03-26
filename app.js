const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const createError = require("http-errors");

const passportConfig = require("./config/passport");
const mongooseConfig = require("./config/mongoose");

const indexRouter = require("./routes/index");

const ERROR = require("./constants/errorConstants");

const app = express();

require("dotenv").config();

passportConfig(app);
mongooseConfig();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);

app.use(function(req, res, next) {
  next(createError(404, ERROR.NOT_FOUND));
});

app.use(function(err, req, res, next) {
  if (err instanceof mongoose.CastError) {
    console.log(ERROR.MONGOOSE_ERROR);
  }

  if (!err.message) {
    err.message = ERROR.SERVER_MESSAGE;
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
