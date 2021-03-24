const express = require("express");
const { VM } = require("vm2");
const router = express.Router();

const problems = require("../models/sample_problems.json");

/* GET problems page. */
router.get("/", (req, res, next) => {
  res.render("problems", { 
    title: "problems",
    problems,
  });
});

router.get("/:problem_id", (req, res, next) => {
  const { problem_id: id } = req.params;
  const problem = problems.find(problem => problem.id === Number(id));

  res.render("eachProblem", { 
    title: "problems",
    result: "> result will be here",
    problem,
    code: "function solution() {}",
  });
});

router.post("/:problem_id", async (req, res, next) => {
  const { problem_id: id } = req.params;
  const { userCode } = req.body;

  const problem = problems.find(problem => problem.id === Number(id));
  const tests = problem.tests;
  let result;

  try {
    for (const test of tests) {
      const vm = new VM();
      const script = userCode + test.code;
      result = await vm.run(script);

      if (result !== test.solution) {
        res.render("eachProblem", {
          result: `wrong answer: expected ${result} to be ${test.solution}`,
          problem,
          code: userCode,
        });
        break;
      }
    }
    res.render("eachProblem", {
      result: `CORRECT!`,
      problem,
      code: userCode,
    });
  } catch (error) {
    res.render("eachProblem", { 
      result: error,
      problem,
      code: userCode,
    });
  }
});

module.exports = router;
