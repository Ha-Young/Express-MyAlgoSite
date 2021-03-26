const express = require("express");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
// const expressLayouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
const initializeMongoDB = require("./utils/initializeMongoDB");
const data = require("./models/sample_problems.json");

const index = require("./routes/index");
const login = require("./routes/login");
const logout = require("./routes/logout");
const problems = require("./routes/problems");
const validateLoginStatus = require("./utils/validateLoginStatus");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded());

app.set("view engine", "ejs");
// app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("MongoDB Connection Error"));
db.once("open", () => console.log("MongoDB Connected"));

if (process.env.INITIALIZE_MONGODB === "true") {
  initializeMongoDB(data);
}

app.use("/", index);
app.use("/login", login);
app.use("/logout", logout);
app.use((req, res, next) => validateLoginStatus(req, res, next));
app.use("/problems", problems);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err.message);
  res.status(err.status || 500);
  res.render("error", { err });
});

module.exports = app;
