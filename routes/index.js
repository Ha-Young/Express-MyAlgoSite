const express = require("express");
const passport = require("passport");
const router = express.Router();
const problemsController = require("../routes/controllers/problems.controller");

const { authenticateUser } = require("./middlewares/authorization");

/* GET home page. */

// router.get("/", authenticateUser, (req, res, next) => {
//   res.render("index", { title: "vaco" });
// });

router.get("/", authenticateUser, problemsController.getProblems);

router.get("/login", (req, res, next) => {
  res.render("login");
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
