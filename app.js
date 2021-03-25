const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const passportConfig = require("./config/passport");
const mongooseConfig = require("./config/mongoose");

const indexRouter = require("./routes/index");

const app = express();

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
