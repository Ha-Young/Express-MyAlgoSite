const express = require("express");
const vm = require("vm");
const router = express.Router();
const { User } = require("../models/User");
const { Problem } = require("../models/Problem");
const { isLoggedIn } = require("../middleware/checkLogin");

/* GET home page. */

router.get("/:problem_id", isLoggedIn, async (req, res, next) => {
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

router.post("/:problem_id", isLoggedIn, async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const userCode = req.body.userCode;
    const currentProblem = await Problem.findById(problemId).lean();
    const currentUser = await User.findById(req.user._id).lean();
    const tests = currentProblem.tests;
    const userResult = { userSolution: null };

    const results = [];
    let finalResult = "";
    let successCount = 0;
    let failCount = 0;

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

      const currentResult = {
        code: test.code,
        userResult: userResult.userSolution,
        solution: test.solution,
      };

      results.push(currentResult);
    }

    if (failCount !== 0) {
      finalResult = "틀렸습니다 😹";
      return res.render("results/failure", {
        data: { ...currentProblem, results, finalResult, userAnswer: userCode },
      });
    }

    const completedUsers = currentProblem.completedUsers.map((objectId) =>
      objectId.toString()
    );
    const completedCount = currentProblem.completedCount;
    const currentRating = currentUser.rating;
    const currentSolved = currentUser.solvedProblems;

    if (completedUsers.indexOf(currentUser._id.toString()) === -1) {
      const updatedList = [...completedUsers, currentUser._id];
      const updatedCount = completedCount + 1;
      const updatedRating = currentRating + currentProblem.difficulty;
      const updatedSolved = [...currentSolved, currentProblem._id];

      await Problem.updateOne(
        { _id: currentProblem._id },
        { completedUsers: updatedList }
      ).updateOne(
        { _id: currentProblem._id },
        { completedCount: updatedCount }
      );

      await User.updateOne(
        { _id: currentUser._id },
        { rating: updatedRating }
      ).updateOne({ _id: currentUser._id }, { solvedProblems: updatedSolved });
    }

    finalResult = "정답입니다 😺";
    res.render("results/success", {
      data: { ...currentProblem, results, finalResult, userAnswer: userCode },
    });
  } catch (error) {
    res.render("error", { message: error, error });
  }
});

module.exports = router;
