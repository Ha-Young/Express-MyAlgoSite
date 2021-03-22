const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", function (req, res) {
  res.render("login");
});

router.get(
  '/github',
  passport.authenticate('github')
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: "/",
  })
);

module.exports = router;
