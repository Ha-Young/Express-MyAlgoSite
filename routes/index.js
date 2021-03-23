const express = require("express");

const problemsController = require("./controllers/problems.controller");
const problemRouter = require("../routes/problems/index");
const authRouter = require("../routes/auth/index");
const authenticateUser = require("./middlewares/autheticate");

const router = express.Router();

const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();

router.use(session({ secret: process.env.SECCSION_SECRET_KEY, resave: true, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET_KEY,
    callbackURL: process.env.CALLBACK_URL,
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

router.get("/", authenticateUser, problemsController.getAll);

// router.use("/login", authRouter);

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get("/login/google/callback",
	passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/"
}));

router.use("/problems", problemRouter);

module.exports = router;
