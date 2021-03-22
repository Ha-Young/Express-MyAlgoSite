const mongoose = require("mongoose");

const User = require("../../models/User");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const exist = await User.findOne({ username });
};
