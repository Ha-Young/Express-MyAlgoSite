const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { jwtSecret } = require("../../config");
const User = require("../../models/User");

exports.viewJoin = function (req, res, next) {
  res.render("pages/join", { user: req.user || {} });
};

exports.viewLogin = function (req, res, next) {
  res.render("pages/login", { user: req.user || {}, errMsg: "" });
};

exports.join = async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return next(createError(400, { message: "해당 이메일을 가진 사용자가 존재합니다." }));
  }

  try {
    const newUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    // 아래 login로직과 겹치는데 Service로 login logic 따로 빼기!
    jwt.sign(newUser.toJSON(), jwtSecret, (err, token) => {
      if (err) {
        return next(createError(err));
      }

      return res
        .cookie("jwtToken", token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .redirect("/");
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.login = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.render("pages/login", { user: req.user || {}, errMsg: err.message });
    }

    jwt.sign(user.toJSON(), jwtSecret, (err, token) => {
      if (err) {
        return next(createError(err));
      }

      return res
        .cookie("jwtToken", token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .redirect("/");
    });
  })(req, res);
};

exports.logout = function (req, res, next) {
  res.clearCookie("jwtToken");
  res.redirect("/login");
};
