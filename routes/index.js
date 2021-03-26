const express = require("express");
const passport = require("passport");
const router = express.Router();

const problemsController = require("../routes/controllers/problems.controller");
const authenticateUser = require("./middlewares/authenticateUser");

router.get("/", authenticateUser, problemsController.getAll);

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }
));

router.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  }
));

module.exports = router;
