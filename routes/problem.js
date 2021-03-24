const express = require("express");
const vm = require("vm");
const router = express.Router();
const { Problem } = require("./../models/Problem");

/* GET home page. */

router.get("/:problem_id", async (req, res, next) => {
  try {
    const currentProblem = await Problem.findById(req.params.problem_id);
    if (currentProblem) {
      problem = currentProblem;
      res.render("problem", { data: currentProblem });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    res.redirect("/");
  }
});

router.post("/:problem_id", async (req, res, next) => {
  try {
    // 제출된 data를 받아서 결과에 출력해야한다
    // db에 내 정답도 저장해야 한다.
    // 정답이라면, 정답자 수도 카운트 해야한다.
    const userCode = req.body.userCode;
    const currentProblem = await Problem.findById(req.params.problem_id);
    const tests = currentProblem.tests;
    const userResult = { userSolution: null };
    let successCount = 0;
    let failCount = 0;

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
      return res.render("results/failure");
    }

    res.render("results/success");
  } catch (error) {
    res.render("results/failure", { message: error, error });
  }
});

module.exports = router;
