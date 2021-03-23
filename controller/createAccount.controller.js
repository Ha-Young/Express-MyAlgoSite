const mongoose = require("mongoose");
const createError = require("http-errors");
const url = require("url");

const User = require("../models/User");
const flash = require("express-flash");



exports.get = async (req, res, next) => {
  try {
    const flashContents = (req.flash("message")[0]);
    const options = {
      name: "",
      email: "",
      message: "",
    };

    if (flashContents) {
      Object.assign(options, flashContents);
    }

    res.render("createAccount", options);
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

      req.flash("message",
        {
          name,
          email,
          message: "This email has already been signed up."
        });
      res.redirect("/create_account");
    } else {
      next(createError(500, err.message));
    }
  }
};
