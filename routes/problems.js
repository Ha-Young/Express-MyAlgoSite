const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const createError = require("http-errors");
const getArgsAndBody = require("../utils/getArgsAndBody");

//Q. DB는 미들웨어 or 라우터마다 호출?
router.get("/", async (req, res, next) => {
  const problems = await Problem.find({});
  res.render("problems", { problems: problems });
});

router.get("/:problem_id", async (req, res, next) => {
  const { problem_id } = req.params;
  // util 함수로 만들것!
  const problems = await Problem.find({});

  const problemIdx = problems.findIndex((problem) => {
    return problem.id.toString() === problem_id;
  });

  // next() return도 될듯???
  if (problemIdx === -1) {
    return next(createError(404, "This Problem Does Not Exist :("));
  }

  res.render("problem", { problem: problems[problemIdx] });
});

router.post("/:problem_id", (req, res, next) => {
  const { solution } = req.body;
  const { args, body } = getArgsAndBody(solution);

  // error 처리할 것...
  const solutionFunc = new Function(...args, body);
  solutionFunc();
  res.send("POST 구현해야 합니다.");
});

module.exports = router;
