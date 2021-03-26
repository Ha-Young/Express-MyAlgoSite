const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/User");
const initializePassport = require("../config/passport");

initializePassport(
  passport,
  email => User.find({ email }),
  id => User.findById(id),
);

function renderLogin(req, res, next) {
  res.render("login", { title: "login" });
}

function renderRegister(req, res, next) {
  res.render("register", { title: "register" });
}

const authenticate = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

async function register(req, res, next) {
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

exports.renderLogin = renderLogin;
exports.renderRegister = renderRegister;
exports.register = register;
exports.logout = logout;
exports.authenticate = authenticate;
