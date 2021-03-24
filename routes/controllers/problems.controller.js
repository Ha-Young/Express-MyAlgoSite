const assert = require("assert");
const vm = require("vm");
const Problem = require("../../models/Problem");

exports.getProblem = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const problem = await Problem.find({id: problemId});
  const parameters = problem[0].parameters.join(", ");
  const firstLine = "function solution (" + parameters + ") {}";

  res.render("problem", { problem: problem[0], firstLine: firstLine});
}

exports.postSolution = async function (req, res,next) {
  const problemId = req.params.problem_id;
  const problem = await Problem.find({id: problemId});
  const testcases = problem[0].tests;

  for (let i = 0; i < testcases.length; i++) {
    const solution = req.body.solution;
    const code = testcases[i].code;
    const answer = testcases[i].solution;

    
    try {
      const sandbox = {
        result: ""
      }
      const context = vm.createContext(sandbox);
      const script = new vm.Script(solution + "result=" + code);
      console.log(script);
      script.runInContext(context);

      console.log(sandbox.result, answer);
    } catch (error) {
      res.render("problemError", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      return;
    }
  }
  res.render("success");
}