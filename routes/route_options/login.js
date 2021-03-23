const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login", { layout: "./layouts/login_layout", title: "Login" });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
