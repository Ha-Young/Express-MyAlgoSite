const assert = require("assert");
const {VM, VMScript} = require("vm2");
const Problem = require("../../models/Problem");

exports.getProblem = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const problem = await Problem.find({id: problemId});
  const parameters = problem[0].parameters.join(", ");
  const firstLine = "function(" + parameters + ") {}";
  
  res.render("problem", { problem: problem[0], firstLine: firstLine});
}

exports.postSolution = function (req, res,next) {
  const sandbox = {
    result : {}
  }

  const vm = new VM(sandbox);

  const solution = "result = " + req.body.solution;
  const script = new VMScript(solution);
  vm.run(script);

  console.log(vm.sandbox.result);
  res.render("success");
}