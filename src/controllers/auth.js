const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { jwtSecret } = require("../config");
const User = require("../models/User");

exports.viewJoin = function (req, res, next) {
  res.render("pages/join");
};

exports.viewLogin = function (req, res, next) {
  res.render("pages/login");
};

exports.join = async function (req, res, next) {
  const user = User.findOne({ email: req.body.email });

  if (user) {
    next(createError(400, { message: "해당 이메일을 가진 사용자가 존재합니다." }));
    return;
  }

  try {
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });
    res.redirect("/");

  } catch (err) {
    next(createError(err));
  }
};

exports.login = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        next(createError(err));
        return;
      }

      jwt.sign(user.toJSON(), jwtSecret, (err, token) => {
        if (err) {
          next(createError(err));
          return;
        }

        return res
          .cookie("jwtToken", token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
          })
          .status(200)
          .json({ user, token });
      });
    });
  })(req, res);
};
