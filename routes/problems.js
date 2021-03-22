const express = require("express");
const router = express.Router();
const problems = require("../models/sample_problems.json");

router.get("/:problem_id", (req, res, next) => {
  const { problem_id } = req.params;

  // util 함수로 만들것!
  const problemIdx = problems.findIndex((problem) => {
    return problem.id.toString() === problem_id;
  });

  if (problemIdx === -1) {
    //http error로 예외처리하기...
    //next()
  }

  res.render("problems", { problem: problems[problemIdx] });
});

router.post("/", (req, res, next) => {
  res.send("POST 구현해야 합니다.");
});
module.exports = router;
