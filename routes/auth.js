const express = require("express");
const router = express.Router();

const createError = require("http-errors");
const passport = require("passport");

router.get("/", (req, res) => {
  res.status(200).render("login", { message: "Login" });
});

router.get("/github",
  passport.authenticate("github"));

router.get("/github/callback", 
  passport.authenticate("github", { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = router;
