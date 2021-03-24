const express = require("express");
const router = express.Router();
const problems = require("../models/sample_problems.json");
const createError = require("http-errors");
const getArgsAndBody = require("../utils/getArgsAndBody");

router.get("/", (req, res, next) => {
  res.render("problems", { problems: problems });
});

router.get("/:problem_id", (req, res, next) => {
  const { problem_id } = req.params;

  // util 함수로 만들것!
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

  const solutionFunc = new Function(...args, body);
  solutionFunc();
  res.send("POST 구현해야 합니다.");
});

module.exports = router;
