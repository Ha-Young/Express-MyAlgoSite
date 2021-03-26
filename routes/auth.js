const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("./controllers/authController");


router.get("/", function (req, res) {
  res.locals.isLogIn = req.isAuthenticated();
  res.render("auth");
});

router.get("/signup", authController.renderSignup);
router.post("/signup", authController.signup);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/auth");
});

router.post(
  "/local",
  passport.authenticate("local", {
    failureRedirect: "/auth",
    successRedirect: "/",
  })
);

router.get(
  "/github",
  passport.authenticate("github")
);

router.get(
  "/github/callback",
  (req, res, next) => {
    console.log("❗️ after GET /github/callback, before passport.");

    next();
  },
  passport.authenticate("github", {
    failureRedirect: "/auth",
    successRedirect: "/",
  }),
  (req, res, next) => {
    console.log("❗️ after GET /github/callback, after passport");

    next();
  },
);

module.exports = router;
