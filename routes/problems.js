const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const User = require("../models/User");
const createError = require("http-errors");
const getArgsAndBody = require("../utils/getArgsAndBody");
const getProblem = require("../utils/getProblem");
const makeAndExcuteSolutionFunc = require("../utils/makeAndExcuteSolutionFunc");

//Q. DB는 미들웨어 or 라우터마다 호출?
router.get("/", async (req, res, next) => {
  try {
    const problems = await Problem.find({});
    res.render("problems", { problems: problems });
  } catch (err) {
    next(createError(404, "there are problems :("));
  }
});

router.get("/:problem_id", async (req, res, next) => {
  try {
    const { problem_id } = req.params;
    const problems = await Problem.find({});
    const problem = getProblem(problems, problem_id);
    res.render("problem", { problem: problem });
  } catch (err) {
    next(createError(404, "There is no problem :("));
  }
});

router.post("/:problem_id", async (req, res, next) => {
  const { solution } = req.body;
  const { problem_id } = req.params;
  const problems = await Problem.find({});
  const problem = getProblem(problems, problem_id);
  const { tests } = problem;

  // next(createError(404, "There is no problem :("));

  const { funcArgs, funcBody } = getArgsAndBody(solution);
  const testResults = makeAndExcuteSolutionFunc(funcArgs, funcBody, tests);
  console.log(testResults);

  const isPass = testResults.every((testResult) => testResult === true);
  console.log(isPass);
  if (isPass) {
    res.render("success");
  } else {
    res.render("failure");
  }

  // res.send("POST 구현해야 합니다.");

  // console.log(err.message);
  // res.send("함수를 입력하세요.");
});

module.exports = router;
