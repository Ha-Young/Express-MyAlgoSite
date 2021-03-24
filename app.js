const express = require("express");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const mongoose = require("mongoose");
const initializeMongoDB = require("./utils/initializeMongoDB");

const index = require("./routes/index");
const login = require("./routes/login");
const logout = require("./routes/logout");
const problems = require("./routes/problems");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  }),
);

app.use(passport.initialize());
app.use(passport.session(), (req, res, next) => {
  console.log("session");
  next();
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("MongoDB Connection Error"));
db.once("open", () => console.log("MongoDB Connected"));

if (process.env.INITIALIZE_MONGODB === "true") {
  initializeMongoDB();
}

app.use("/", index);
app.use("/login", login);
app.use("/logout", logout);
app.use("/problems", problems);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.status === 404) {
    return res.send(err.message);
  }

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
