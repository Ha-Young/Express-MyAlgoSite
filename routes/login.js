const router = require("express").Router();
const passport = require("passport");
const keys = require("../config/keys");
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
