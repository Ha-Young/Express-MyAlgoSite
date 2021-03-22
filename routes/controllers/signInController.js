const dotenv = require("dotenv");
const { registerValidation } = require("../../util/validation");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

dotenv.config();

exports.renderSigninPage = function (req, res, next) {
  res.status(200).render("signIn", { title: "this is signIn page" });
};

exports.createUser = async function (req, res, next) {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  } // 절차형 단점 어떻게 헤쳐나가야할지?

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    console.log(savedUser);

    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
};
