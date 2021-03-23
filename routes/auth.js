const express = require("express");
const router = express.Router();

const passport = require("passport");

const authController = require("./controllers/auth.controller");

router.get("/", authController.localLogin);

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: '/login' }),
  authController.redirect,
);

module.exports = router;
