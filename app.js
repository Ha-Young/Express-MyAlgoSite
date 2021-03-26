require("dotenv").config();

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const authRouter = require("./routes/auth");
const problemsRouter = require("./routes/problem");
const logoutRouter = require("./routes/logout");

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Database connection sucessful👍🏻"))
  .catch(err => console.log(err));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (token, tokenSecret, profile, done) => {

      try {
        const user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            googleEmail: profile.emails[0].value,
            name: profile.name.givenName
          });

          done (null, newUser);
          return;
        }

        done(null, user);
      } catch (err) {

        done(err);
      }
    }
  )
);

const app = express();

app.use(express.static("public"));

app.use(session({
  secret: process.env.CLIENT_SECRET,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false
}));

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {

  done(null, user._id);
});

passport.deserializeUser(function (id, done) {

  done(null, id);
});

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use("/problems", problemsRouter);
app.use("/logout", logoutRouter);

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error", { });
});

module.exports = app;
