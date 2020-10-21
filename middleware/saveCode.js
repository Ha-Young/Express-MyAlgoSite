/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const asyncWrapper = require("./asyncWrapper");
const { JwtError, MongoError } = require("../service/error");

const SECRET_KEY = process.env.JWT_KEY;

function saveCode(req, res, next) {
  const token = req.cookies && req.cookies.loginToken;

  jwt.verify(token, SECRET_KEY, asyncWrapper(async (err, decoded) => {
    if (err) next(new JwtError());

    const code = req.body.code;
    const userId = decoded.user._id;
    const problemId = req.params.problem_id;

    const hasProblemCode = await User.findOne({ "solved.problemId": problemId });

    if (hasProblemCode) {
      await User.updateOne({ "solved.problemId": problemId }, { "solved.$.code": req.body.code });
    } else {
      await User.findOneAndUpdate({ _id: userId }, { $push: { solved: { problemId, code }}});
    }

    next();
  }));
}

module.exports = saveCode;
