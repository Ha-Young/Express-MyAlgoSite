const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const initializePassport = require("../passport-config");

const router = express.Router();

initializePassport(
  passport,
  (email) => USERS.find(user => user.email === email),
  (id) => USERS.find(user => user.id === id),
);

// temp user db

const USERS = [];


/* GET login page. */
router.get("/", (req, res, next) => {
  res.render("login", { title: "login" });
});

router.post("/", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}));

router.get("/register", (req, res, next) => {
  res.render("register", { title: "register" });
});

router.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    USERS.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (err) {
    res.redirect("/login/register");
  }
});

module.exports = router;
