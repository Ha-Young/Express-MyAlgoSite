const Problem = require("../../models/Problem");
const { VM } = require("vm2");
const vm = require("vm");

exports.renderProblemPageById = async function (req, res, next) {
  console.log("global", global);

  const requestedId = req.params.id;
  const fetchedProblem = await Problem.findById(requestedId);

  res.status(200).render("problem", { problem: fetchedProblem });
};

exports.checkUserSolution = async function (req, res, next) {
  const vm2 = new VM({
    sandbox: { solution: null },
  });

  const submitedCode = vm2.run(`solution = ${req.body.solution}`);
  console.log(submitedCode);

  const submitedCode2 = vm2.run(`solution(['Jane', 'Kim'])`);
  console.log(submitedCode2);

  // const sandbox = { solution: null };

  // vm.createContext(sandbox);
  // const submitedCode = vm.runInNewContext(
  //   `solution = ${req.body.solution}`,
  //   sandbox
  // );

  // const submitedCode2 = vm.runInNewContext(
  //   `solution(['Jane', 'Kim'])`,
  //   sandbox
  // );

  // console.log(submitedCode2);

  // const submitedCode3 = vm.runInNewContext(
  //   `solution(['Jane', 'Huh', 'Kim'])`,
  //   sandbox
  // );

  // console.log(submitedCode3);
  // console.log(sandbox);

  const requestedId = req.params.id;
  const fetchedProblem = await Problem.findById(requestedId);
  res.status(200).render("problem", { problem: fetchedProblem });
};
