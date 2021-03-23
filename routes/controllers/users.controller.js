const User = require("../../models/User");
const mongoose = require("mongoose");

exports.signUp = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).render("success", { message: "가입이 완료되었습니다." });
  } catch (err) {
    next(err);
  }
};
