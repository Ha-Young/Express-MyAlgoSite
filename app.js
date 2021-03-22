const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const index = require("./routes/index");

const app = express();
const db = mongoose.connection;

const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use(session({ secret: "SECRET_CODE", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: "727563612247-jv4u2v4uuf2n64flhgll5h5bheosflf4.apps.googleusercontent.com",
    clientSecret: "2Mvzg8EGOC8tHZkD7wWbqNpl",
    callbackURL: "http://localhost:3000/login/google/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect("/login");
  }
};

mongoose.connect(
  "mongodb://127.0.0.1:27017",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

db.on("error", console.error);

db.once("open", () => {
  console.log("Successfully connected to mongdb");
});

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", authenticateUser, index);

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.get("/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/login/google/callback",
	passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/"
}));

app.use(function(req, res, next) {
  const err = new Error("Not Found");

  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
