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
    } else {
      const completedUsers = currentProblem.completedUsers.map((objectId) =>
        objectId.toString()
      );
      const completedCount = currentProblem.completedCount;

      if (completedUsers.indexOf(currentUser._id.toString()) === -1) {
        const updatedList = [...completedUsers, currentUser._id];
        const updatedCount = completedCount + 1;

        await Problem.updateOne(
          { _id: currentProblem._id },
          { completedUsers: updatedList }
        );
        await Problem.updateOne(
          { _id: currentProblem._id },
          { completedCount: updatedCount }
        );
      }
    }
    res.render("results/success", { data: currentProblem });
  } catch (error) {
    res.render("error", { message: error, error });
  }
});

module.exports = router;
