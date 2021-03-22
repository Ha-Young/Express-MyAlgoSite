const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.checkLogin = async (req, res, next) => {

};

exports.signUp = async (req, res, next) => {
  const userInfo = new User(req.body);
  try {
    await userInfo.save();
    res.render("success", { message: "가입이 완료되었습니다." });
  } catch (err) {
    next(err);
  }
};
