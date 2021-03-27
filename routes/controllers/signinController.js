const createError = require("http-errors");
const bcrypt = require("bcrypt");

const User = require("../../models/User");
const errorMessage = require("../../constants/errorMessage");

exports.renderSigninPage = function (req, res, next) {
  res.status(200).render("signin");
};

exports.createUser = async function (req, res, next) {
  try {
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
      const createdErr = createError(400, errorMessage.EMAIL_EXIST);
      next(createdErr);
    }

    const userPassword = req.body.password;
    const saltValue = 10;
    const encryptedPassword = await encryptPassword(saltValue, userPassword);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });

    try {
      await user.save();
      res.redirect("/");
    } catch (error) {
      const createdErr = createError(500, errorMessage.SERVER_ERROR);
      next(createdErr);
    }
  } catch (error) {
    const createdErr = createError(500, errorMessage.SERVER_ERROR);
    next(createdErr);
  }
};

async function encryptPassword(saltValue, userPassword) {
  try {
    const salt = await bcrypt.genSalt(saltValue);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    return hashedPassword;
  } catch (error) {
    const createdErr = createError(500, errorMessage.SERVER_ERROR);
    return createdErr;
  }
}
