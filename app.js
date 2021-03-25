const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const flash = require("express-flash");

const passport = require("passport");

const methodOverride = require("method-override");

const mongoose = require("mongoose");
const path = require("path");

const app = express();

const mongoDB = process.env.MONGO_URL;

mongoose.connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log("mongoDB connected!"))
  .catch(() => console.log("ERROR! can't connect mongoDB!"));

app.set("view engine", "ejs");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(require("./routes"));

module.exports = app;
