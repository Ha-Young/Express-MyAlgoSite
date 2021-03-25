const express = require("express");
const passport = require("passport");

const User = require("../models/User");
const initializePassport = require("../passport-config");
const { checkNotAuthenticated, checkAuthenticated } = require("../middlewares/auth");
const { renderLogin, renderRegister, authenticate, register } = require("../controllers/auth.controller");

const router = express.Router();

initializePassport(
  passport,
  email => User.find({ email }),
  id => User.findById(id),
);

router.get("/login", checkNotAuthenticated, renderLogin);
router.get("/register", checkNotAuthenticated, renderRegister);

router.post("/login", authenticate);
router.post("/register", register);

router.delete("/logout", checkAuthenticated, (req, res) => {
  req.logOut();
  res.redirect("/auth/login");
});

module.exports = router;
