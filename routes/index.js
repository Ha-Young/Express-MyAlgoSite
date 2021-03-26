const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const Problem = require("../models/Problem");

/* GET home page. */

router.get("/", async (req, res, next) => {
  try {
    const user = await req.user;
    const problems = await Problem.find();
    const problemList = [];

    const solvedProblemId = user.problems
      .filter((triedProblem) => triedProblem.isSolved)
      .map((solvedProblem) => solvedProblem.problemId.toString());

    for (const problem of problems) {
      if (solvedProblemId.includes(problem._id.toString())) {
        problemList.push({ problem, isSolved: true });
      } else {
        problemList.push({ problem, isSolved: false });
      }
    }

    // console.log(problems);

    res.render("index", {
      email: user.email,
      problemList,
    });
  } catch (err) {
    next(createError(500, err.message));
  }
});

module.exports = router;
