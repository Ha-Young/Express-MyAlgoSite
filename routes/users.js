const express = require('express');
const router = express.Router();
const passport = require("passport");
const usersController = require("./controllers/users.controller");

const initializePassport = require("./middlewares/passport-config");
initializePassport(passport);

/* GET home page. */
router.get("/login", (req, res, next) => {
  res.render('login');
});

router.post("/login/check", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true
}));

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect('/users/login');
});

router.get("/signup", (req, res, next) => {
  res.render('signup');
});

router.post("/signup", usersController.signUp);

module.exports = router;
