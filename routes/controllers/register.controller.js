const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../../models/User");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const exist = await User.findOne({ username });

  if (exist) {
    res.status(504).send("이미 존재하는 아이디입니다.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    hashedPassword,
  });

  await user.save();
  res.redirect('/');
};
