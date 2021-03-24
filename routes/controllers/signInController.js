const dotenv = require("dotenv");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

dotenv.config();

exports.renderSigninPage = function (req, res, next) {
  res.status(200).render("signUp");
};

exports.createUser = async function (req, res, next) {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    next("Email already exists");
    // return res.status(400).send("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.redirect("/");
  } catch (error) {
    next("signIn error");
  }
};
