const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const Problem = require("../models/Problem");
const User = require("../models/User");

const getArgsAndBody = require("../utils/getArgsAndBody");
const getProblem = require("../utils/getProblem");
const makeAndExcuteSolutionFunc = require("../utils/makeAndExcuteSolutionFunc");

//Q. DB는 미들웨어 or 라우터마다 호출?
// render에서 error...
router.get("/", async (req, res, next) => {
  try {
    const problems = await Problem.find({});
    res.render("problems", { problems: problems });
  } catch (err) {
    next(createError(500, "there are problems :("));
  }
});

router.get("/:problem_id", async (req, res, next) => {
  try {
    const { problem_id } = req.params;
    const problem = await Problem.find({ id: problem_id }).then(
      (docs) => docs[0],
    );

    if (!problem) throw new Error();

    res.render("problem", { problem: problem });
  } catch (err) {
    next(createError(500, "There is no problem :("));
  }
});

router.post("/:problem_id", async (req, res, next) => {
  const { solution } = req.body;
  const { problem_id } = req.params;
  const { _id, username } = req.user;
  let tests;

  try {
    const problem = await Problem.find({ id: problem_id }).then(
      (docs) => docs[0],
    );

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { solution },
      { new: true },
    );

    tests = problem.tests;
  } catch (err) {
    next(createError(500, "There is no problem :("));
  }

  try {
    const { funcArgs, funcBody } = getArgsAndBody(solution);
    const testResults = makeAndExcuteSolutionFunc(funcArgs, funcBody, tests);
    const isPass = testResults.every((testResult) => testResult === true);

    if (isPass) {
      res.render("success");
    } else {
      res.render("failure");
    }
  } catch (err) {
    next(createError(400, `작성한 코드의 오류 : ${err.message}`));
  }
});

module.exports = router;
