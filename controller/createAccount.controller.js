const mongoose = require("mongoose");
const createError = require("http-errors");

checkEmailDuplicate = (userInfo) => {
  console.log(userInfo);

  return {
    result: true
  };
}

exports.get = async (req, res, next) => {
  try {
    res.render("createAccount", {
      isRetry: false,
      userInfo: {},
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

exports.create = async (req, res, next) => {
  try {
    checkEmailDuplicate(req.body);

  } catch (err) {
    next(createError(500, err.message));
  }
};