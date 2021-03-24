const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const passportConfig = require("./config/passport");
const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(passport.initialize());

const index = require("./routes/index");
const signIn = require("./routes/signIn");
const logIn = require("./routes/login");
const problem = require("./routes/problem");
const problems = require("./routes/problems");
const dotenv = require("dotenv");

dotenv.config();
passportConfig();

app.use(cookieParser(process.env.JWT_SECRET_KEY));

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((error) => console.error(error)); // 에러분기 처리

app.use("/", index);
app.use("/signIn", signIn);
app.use("/logIn", logIn);
app.use("/problem", problem);
app.use("/problems", problems);

//404 handler
app.use(function (req, res, next) {
  res.status(404).send("404 error");
});

// Global error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { message: err });
});

module.exports = app;
