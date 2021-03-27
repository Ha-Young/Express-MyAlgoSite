const router = require("express").Router();
const passport = require("passport");

const authController = require("./controllers/authController");

router.get("/", (req, res) => {
  res.locals.isLogIn = req.isAuthenticated();
  res.render("auth");
});

router.get("/signup", authController.renderSignup);
router.post("/signup", authController.signup);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth");
});

router.post(
  "/local",
  passport.authenticate("local", {
    failureRedirect: "/auth",
    successRedirect: "/",
  }),
);

router.get(
  "/github",
  passport.authenticate("github"),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth",
    successRedirect: "/",
  }),
);

module.exports = router;
