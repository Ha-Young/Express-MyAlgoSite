const createError = require("http-errors");

const User = require("../models/User");

exports.viewJoin = function (req, res, next) {
  res.render('pages/join');
};

exports.viewLogin = function (req, res, next) {
  res.render('pages/login');
};

exports.join = function (req, res, next) {
  console.log('here');
  console.log(req.body);
  // const newUser = req.body;

  // try {
  //   const user = await User.create(newUser);

  //   res.redirect("/");
  // } catch (err) {
  //   next(createError(err));
  // }
};

exports.login = function (req, res, next) {

};
