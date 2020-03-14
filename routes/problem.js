const router = require("express").Router();
const Problem = require("../models/Problem");
const path = require("path");
const vm = require("vm");

router.get("/:id", async (req, res) => {
  const problem = await Problem.findOne({ id: req.params.id });
  res.render("problem", { problem: problem });
});

router.post("/:id", async (req, res) => {
  console.log(req.body);
  const problem = await Problem.findOne({ id: req.params.id });
  let tests = problem.tests;
  const results = tests.map(test => {
    const context = { result: null, error: null };
    vm.createContext(context); 
    const code =
      req.body.solutionCode +
      "\ntry{result=" +
      test.code +
      "}catch(err){ console.log(err);\nerror=err;}";
    try {
      vm.runInContext(code, context);
    } catch (err) {}
    return { pass: test.solution == context.result, error: context.error };
  });
  const passAll = results.every(result => result.pass);
  if (passAll) {
    res.render("success", { problem, results });
  } else {
    res.render("failure", { problem, results });
  }
});
module.exports = router;
