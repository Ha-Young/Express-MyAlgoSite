const express = require("express");
const passport = require("passport");
const router = express.Router();
const verifyUser = require("../../middlewares/verifyUser");

router.get("/", verifyUser, (req, res, next) => {
  //res.render("login", { layout: "./layouts/login_layout", title: "Login" });
  res.render("login", {title: "login"});
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
