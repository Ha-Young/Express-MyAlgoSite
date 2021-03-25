const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const path = require("path");
const methodOverride = require("method-override");

const db = require("./middlewares/db");
const app = express();

async function appStart() {
  // try-catch여기서도 해야하는지
  // 당초 분기를 하는게 맞는지
  // 그냥 db.init() 하면 안되는지
  await db.init();
}

appStart();
app.set("view engine", "ejs");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(require("./routes"));

module.exports = app;
