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


router.get("/", asyncWrapper(async (req, res, next) => {
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

router.get("/:problem_id/update", async (req, res, next) => {
  const problem = await Problem.findOne({ _id: req.params.problem_id });
  const { examples, tests } = problem;
  const form = problem;
  form["example_code1"] = examples[0].code;
  form["example_code2"] = examples[1].code;
  form["example_answer1"] = examples[0].answer;
  form["example_answer2"] = examples[1].answer;
  form["test_arguments1"] = JSON.stringify(tests[0].args);
  form["test_arguments2"] = JSON.stringify(tests[1].args);
  form["test_result1"] = tests[0].solution;
  form["test_result2"] = tests[1].solution;

  res.render("problem-form", {
    form,
  });
});

module.exports = router;
