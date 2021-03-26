const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const dotenv = require("dotenv");

const passportLoader = require("./config/passport");
const mongooseLoader = require("./config/mongooseLoader");

const app = express();
app.set("view engine", "ejs");
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(express.static("public"));
app.use(express.json());
app.use(passport.initialize());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const index = require("./routes/index");
const signIn = require("./routes/signIn");
const login = require("./routes/login");
const logout = require("./routes/logout");
const problem = require("./routes/problem");
const problems = require("./routes/problems");

dotenv.config();
mongooseLoader();
passportLoader();

app.use("/", index);
app.use("/signIn", signIn);
app.use("/login", login);
app.use("/logout", logout);
app.use("/problem", problem);
app.use("/problems", problems);

app.use(function (req, res, next) {
  const error = createError(404, "This page does not exist!");
  res.status(404).render("error", { error });
});

app.use(function (error, req, res, next) {
  console.log(error);
  res.locals.message = error.message;
  res.locals.erroror = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.render("erroror", { message: error });
});

module.exports = app;
