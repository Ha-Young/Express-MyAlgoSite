const express = require("express");
const vm = require("vm");
const router = express.Router();
const { User } = require("./../models/User");
const { Problem } = require("./../models/Problem");

/* GET home page. */

router.get("/:problem_id", async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const currentProblem = await Problem.findById(problemId).lean();
    const currentUser = await User.findById(req.user._id);
    let userAnswer = "";

    if (currentUser.answers[problemId]) {
      userAnswer = currentUser.answers[problemId];
    }

    if (currentProblem) {
      res.render("problem", { data: { ...currentProblem, userAnswer } });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    res.redirect("/");
  }
});

router.post("/:problem_id", async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const userCode = req.body.userCode;
    const currentProblem = await Problem.findById(problemId).lean();
    const currentUser = await User.findById(req.user._id).lean();
    const tests = currentProblem.tests;
    const userResult = { userSolution: null };
    let successCount = 0;
    let failCount = 0;
    console.log(currentUser.answers);

    await User.updateOne(
      { _id: req.user._id },
      { answers: { ...currentUser.answers, [problemId]: userCode } }
    );

    for (const test of tests) {
      const fullCode = userCode + `userSolution = ${test.code}`;
      vm.createContext(userResult);
      vm.runInContext(fullCode, userResult);

      if (userResult.userSolution === test.solution) {
        successCount++;
      } else {
        failCount++;
      }
    }

    if (failCount !== 0) {
      return res.render("results/failure", { data: currentProblem });
    }

    res.render("results/success", { data: currentProblem });
  } catch (error) {
    res.render("error", { message: error, error });
  }
});

module.exports = router;
