const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", function (req, res) {
  res.render("signin");
});

router.post(
  "/local",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    successRedirect: "/",
  })
);

router.get(
  "/github",
  passport.authenticate("github")
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/signin",
    successRedirect: "/",
  })
);

module.exports = router;
