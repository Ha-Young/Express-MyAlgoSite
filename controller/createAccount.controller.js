const mongoose = require("mongoose");
const createError = require("http-errors");
const url = require("url");

const User = require("../models/User");



exports.get = async (req, res, next) => {
  try {
    res.render("createAccount", {
      isRetry: req.query.isRetry,
      userInfo: {
        name: req.query.name || "",
        email: req.query.email || "",
        password: req.query.password || "",
        passwordConfirm: req.query.passwordConfirm || "",
      },
      message: req.query.message,
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).redirect("/login");
  } catch (err) {
    if (err.code === 11000) {
      const {
        name,
        email,
      } = req.body

      res.redirect(url.format({
        pathname:"/create_account",
        query: {
          isRetry: true,
          name,
          email,
          message: "This email has already been signed up.",
        }
      }));
    } else {
      next(createError(500, err.message));
    }
  }
};