const createError = require("http-errors");

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
  res.locals.name = req.user?.name || null;
  res.render("signup");
};
