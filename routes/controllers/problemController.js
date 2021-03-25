const Problem = require("../../models/Problem");
const vm = require("vm");

exports.renderProblemPageById = async function (req, res, next) {
  const requestedId = req.params.id;
  const fetchedProblem = await Problem.findById(requestedId);

  res.status(200).render("problem", { problem: fetchedProblem });
};

exports.checkUserSolution = async function (req, res, next) {
  const sandbox = { solution: null };

  vm.createContext(sandbox);
  const submitedCode = vm.runInNewContext(
    `solution = ${req.body.solution}`,
    sandbox
  );

  // const submitedCode = vm.runInNewContext(
  //   `solution = ${req.body.solution}`,
  //   sandbox
  // );

  // console.log(submitedCode(4));
  // console.log(sandbox.solution(1));

  const submitedCode2 = vm.runInNewContext(
    `solution(['Jane', 'Kim'])`,
    sandbox
  );

  console.log(submitedCode2);

  const submitedCode3 = vm.runInNewContext(
    `solution(['Jane', 'Huh', 'Kim'])`,
    sandbox
  );

  console.log(submitedCode3);

  const requestedId = req.params.id;
  const fetchedProblem = await Problem.findById(requestedId);
  res.status(200).render("problem", { problem: fetchedProblem });
};
