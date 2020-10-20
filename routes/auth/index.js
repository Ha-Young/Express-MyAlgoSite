/* eslint-disable no-unused-vars */
const express = require("express");

const passport = require("../../passport/github");

const router = express.Router();

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res, next) => {
    res.cookie("loginToken", req.user);
    res.redirect("/problems");
  }
);

module.exports = router;
