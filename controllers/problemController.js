const Problem = require("../models/Problem");
const { TITLE } = require("../constants/common");
const { getArgument } = require("../utils/solution");

exports.home = async (req, res) => {
  problems = await Problem.find().lean();

  res.render("home", { pageTitle: TITLE.HOME, problems });
};

exports.getProblemDetail = async (req, res) => {
  const id = Number(req.params.id);
  const problem = await Problem.findOne({ id });
  const pageTitle = problem.title;

  res.render("problemDetail", {
    pageTitle,
    problem,
    parameter: "n",
  });
};

exports.postSolution = async (req, res) => {
  const id = Number(req.params.id);
  const problem = await Problem.findOne({ id }).lean();
  const userSolution = new Function(`return ${req.body.solution}`)();

  const problemArgList = [];
  const problemAnswerList = [];

  problem.tests.map(example => {
    problemArgList.push(getArgument(example.code)[0]);
    problemAnswerList.push(example.solution);
  });

  const userAnserList = problemArgList.map(arg => userSolution(arg));

  console.log(problemArgList, problemAnswerList);
  console.log(userAnserList);
}
