const User = require("../../models/User");

exports.signup = async (req, res, next) => {
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(201).redirect("/signin");
};

exports.renderSignup = (req, res, next) => {
  res.locals.isLogIn = req.isAuthenticated();
  res.render("signup");
};
