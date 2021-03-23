const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const initializePassport = require("../passport-config");
const { checkNotAuthenticated } = require("../middlewares/auth");

const router = express.Router();

initializePassport(
  passport,
  email => User.find({ email }),
  id => User.findById(id),
);

router.get("/login", checkNotAuthenticated, (req, res, next) => {
  res.render("login", { title: "login" });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}));

router.get("/register", checkNotAuthenticated, (req, res, next) => {
  res.render("register", { title: "register" });
});

router.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const newUser = new User({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect("/auth/login");
  } catch (err) {
    res.redirect("/auth/login/register");
  }
});

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/auth/login");
});

module.exports = router;
