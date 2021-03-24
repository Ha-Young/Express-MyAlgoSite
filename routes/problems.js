const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const createError = require("http-errors");
const getArgsAndBody = require("../utils/getArgsAndBody");

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
    const problems = await Problem.find({});
    const { problem_id } = req.params;
    // util 함수로 만들것!
    const problemIdx = problems.findIndex((problem) => {
      return problem.id.toString() === problem_id;
    });

    // if (problemIdx === -1) {
    //   return next(createError(404, "This Problem Does Not Exist :("));
    // }

    res.render("problem", { problem: problems[problemIdx] });
  } catch (err) {
    next(createError(404, "There is no problem :("));
  }
});

router.post("/:problem_id", (req, res, next) => {
  const { solution } = req.body;

  try {
    const { args, body } = getArgsAndBody(solution);
    const solutionFunc = new Function(...args, body);
    solutionFunc();
    res.send("POST 구현해야 합니다.");
  } catch (err) {
    res.send("함수를 입력하세요.");
  }
});

module.exports = router;
