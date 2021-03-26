const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");

exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

exports.getRegister = (req, res, next) => {
  res.render("register", { message: req.session.userExist });
  req.session.userExist = null;
};

exports.postRegister = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      req.session.userExist = "이미 존재하는 이메일입니다";
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      rating: 0,
      solvedProblems: [],
    });

    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

exports.getLogout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
