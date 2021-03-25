const User = require("../models/User");

const bcrypt = require("bcrypt");

const { ErrorHandler } = require("../util/error");

async function hashPassword(password, saltRounds) {
  return await bcrypt.hash(password, Number(saltRounds));
}

async function compareHashPassword(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
}

async function signUp(userData) {
  let user;
  let error;

  try {
    const {
      username,
      email,
      password,
      confirmPassword,
    } = userData;
  
    if (password !== confirmPassword) {
      throw new ErrorHandler(400, "Bad Request");
    }

    const hashedPassword = await hashPassword(password, process.env.SALT_ROUNDS);

    user = User({
      username,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    error = err;
  }

  return { user, error };
}

exports.signUp = signUp;
exports.compareHashPassword = compareHashPassword;
