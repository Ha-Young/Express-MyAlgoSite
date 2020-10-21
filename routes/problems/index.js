/* eslint-disable no-unused-vars */
const express = require("express");
const jwt = require("jsonwebtoken");

const Problem = require("../../models/Problem");
const User = require("../../models/User");
const saveCode = require("../../middleware/saveCode");
const verifyProblem = require("../../middleware/verifyProblem");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { JwtError } = require("../../service/error");

const SECRET_KEY = process.env.JWT_KEY;

const router = express.Router();

const athenticate = require("../../middleware/athenticate");

router.get("/", athenticate, asyncWrapper(async (req, res, next) => {
  const problems = await Problem.find({});

  res.render("problems", {
    data: problems,
  });
}));

router.post("/", asyncWrapper(async (req, res, next) => {
  await Problem.create(req.body);

  res.status(201).json({ status: "ok" });
}));

router.get("/:problem_id", asyncWrapper(async (req, res, next) => {
  const problemId = req.params.problem_id;
  const currentProblem = await Problem.findById({ _id: problemId });

  jwt.verify(req.cookies.loginToken, SECRET_KEY, async (err, decoded) => {
    if (err) next(new JwtError(err.message));

    const userId = decoded.user._id;
    const user = await User.findOne({ _id: userId });
    const problem = user.solved.find(problem => (
      problem.problemId.toString() === problemId
    ));
    const userCode = problem && problem.code;

    res.render("article", {
      data: currentProblem,
      userCode,
      errMessage: req.query.errMessage,
    });
  });
}));

router.post("/:problem_id/verify", saveCode, verifyProblem, (req, res, next) => {
  res.render("success");
});

module.exports = router;
