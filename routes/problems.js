const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const createError = require("http-errors");
const getArgsAndBody = require("../utils/getArgsAndBody");
const getProblem = require("../utils/getProblem");

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

  try {
    const { problem_id } = req.params;
    const problems = await Problem.find({});
    const problem = getProblem(problems, problem_id);
    const { tests } = problem;
    const { args, body } = getArgsAndBody(solution);

    const solutionFunc = new Function(...args, body)
      .toString()
      .replace("function anonymous", "function solution");

    tests.forEach((test) => {
      const executionFuncBody = solutionFunc.concat(" ", test.code);
      const executionFunc = new Function(executionFuncBody);
      executionFunc();
    });

    res.send("POST 구현해야 합니다.");
  } catch (err) {
    res.send("함수를 입력하세요.");
  }
});

module.exports = router;
