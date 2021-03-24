const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("./controllers/authController");


router.get("/", function (req, res) {
  res.locals.name = req.user?.name || null;
  res.render("auth");
});

router.post("/signup", authController.signup);
router.get("/signup", authController.renderSignup);

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
  passport.authenticate("github", {
    failureRedirect: "/auth",
    successRedirect: "/",
  })
);

module.exports = router;
