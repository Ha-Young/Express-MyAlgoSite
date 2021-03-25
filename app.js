if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const createError = require("http-errors");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const { User } = require("./models/User");
const morgan = require("morgan");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const path = require("path");
const methodOverride = require("method-override");

const indexRoute = require("./routes");
const problemRoute = require("./routes/problem");
const { isLoggedIn } = require("./middleware/checkLogin");
const initializePassport = require("./config/passportConfig");

const mongoose = require("mongoose");
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(`err: ${err}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connect Success!!"))
  .catch((err) => console.log("MonError Fail.." + err));

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// app.use(methodOverride("_method"));

app.use("/", indexRoute);
app.use("/problem", isLoggedIn, problemRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
