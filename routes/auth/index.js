const express = require("express");
const passport = require("passport");

const router = express.Router();

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
