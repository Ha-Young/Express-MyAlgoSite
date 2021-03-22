const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

require("dotenv").config();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.redirect('/login');
    console.log("없는 유저입니다.");
    return;
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    console.log("잘못된 비밀번호 입니다.");
    res.redirect('/login');
    return;
  }

  const token = jwt.sign(
    { userID: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "7d" },
  );

  res.cookie("access_token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  console.log("로그인 성공");
  res.redirect("/");
};
