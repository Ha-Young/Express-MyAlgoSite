const User = require("../../models/User");

const createError = require("http-errors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", { message: "Login" });
};

exports.localJoin = (req, res) => {
  res.status(200).render("join", { message: "Join" });
};

exports.postUserData = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      throw new Error("password is not matched");
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const user = User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.redirect("/login");
  } catch (error) {
    console.log(error); // 에러 핸들링 필요...
    next(createError());
  }
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/login");
};
