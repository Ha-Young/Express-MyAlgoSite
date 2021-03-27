const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/User");

function getLogin(req, res, next) {
  res.render("login", { title: "login" });
}

function getRegister(req, res, next) {
  res.render("register", { title: "register" });
}

const authenticate = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

async function postRegister(req, res, next) {
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
}

function logout(req, res, next) {
  req.logOut();
  res.redirect("/auth/login");
}

exports.getLogin = getLogin;
exports.getRegister = getRegister;
exports.postLogin = authenticate;
exports.postRegister = postRegister;
exports.logout = logout;
