const express = require("express");

const router = express.Router();

const passport = require("passport");

router.get("/", (req, res, next) => {
  res.render("login");
});

router.get("/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get("/google/callback",
	passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/"
}));

module.exports = router;
