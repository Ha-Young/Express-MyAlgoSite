const User = require("../models/User");

const bcrypt = require("bcrypt");

const { ErrorHandler } = require("../util/error");
const { ERROR } = require("../constants/constants");

async function hashPassword(password, saltRounds) {
  return await bcrypt.hash(password, Number(saltRounds));
}

async function compareHashPassword(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
}

async function signUp(userData) {
  const {
    username,
    email,
    password,
    confirmPassword,
  } = userData;

  if (password !== confirmPassword) {
    throw new ErrorHandler(400, ERROR.BAD_REQUEST);
  }

  const hashedPassword = await hashPassword(password, process.env.SALT_ROUNDS);

  const user = User({
    username,
    email,
    password: hashedPassword,
  });

  return user;
}

exports.signUp = signUp;
exports.compareHashPassword = compareHashPassword;
