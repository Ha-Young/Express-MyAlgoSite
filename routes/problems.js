const express = require("express");
const router = express.Router();
const problems = require("../models/sample_problems.json");
const createError = require("http-errors");

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
  // util 함수로 만들기 //
  const str = solution;
  const trimmedStr = str.replace(/\n|\r| /g, "");

  const reOfArgsBracket = /\([^\)]+\)/;
  const reOfBodyBracket = /\{.+\}/;
  const argsBracket = trimmedStr.match(reOfArgsBracket)[0];
  const bodyBracket = trimmedStr.match(reOfBodyBracket)[0];
  const args = argsBracket.slice(1, -1).split(",");
  const body = bodyBracket.slice(1, -1);

  const func = new Function(...args, body);
  func();
  res.send("POST 구현해야 합니다.");
});
module.exports = router;
