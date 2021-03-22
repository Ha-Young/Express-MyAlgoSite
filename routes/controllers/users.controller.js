const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

exports.checkLogin = async (req, res, next) => {
  const { userId, userPassword } = req.body;
  try {
    const user = await User.findOne({ userId });

    if (user === null) {
      console.log("wrong id");
      return;
    } else {
      const encodedPassword = user.userPassword;
      await bcrypt.compare(userPassword, encodedPassword, (err, result) => {
        if (err) {
          next(err);
          return;
        }

        if (result === true) {
          const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
          res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
          res.redirect("/");
        } else {
          console.log("wrong pwd");
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.signUp = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).render("success", { message: "가입이 완료되었습니다." });
  } catch (err) {
    next(err);
  }
};

exports.logOut = (req, res, next) => {
  res.clearCookie("authcookie");
  res.redirect('/users/login');
}
