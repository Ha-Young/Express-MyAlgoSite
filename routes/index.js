const express = require("express");
const router = express.Router();

const passport = require("passport");

const problemController = require("./controllers/problems.controller");
const authController = require("./controllers/auth.controller");
const { isAuthenticated } = require("./middlewares/authorization");

router.get("/login", authController.getLoginPage);
router.post("/login", passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/" }));

router.get("/login/github", passport.authenticate("github"));
router.get(
  "/login/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", successRedirect: "/" }));

router.get("/", isAuthenticated, problemController.getAll);

router.get("/logout", isAuthenticated, authController.logout);

module.exports = router;
