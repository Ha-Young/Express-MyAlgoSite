const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

const index = require("./routes/index");
const login = require("./routes/login");
const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((error) => console.error(error)); // 에러분기 처리

app.use("/", index);
app.use("/login", login);

//404 handler
app.use(function (req, res, next) {
  const err = new Error("404 Error");
  err.status = 404;
  next(err);
});

// Global error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
