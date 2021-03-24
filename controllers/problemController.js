const problems = require("../models/sample_problems.json");
const { TITLE } = require("../constants/common");

exports.home = (req, res) => {
  res.render("home", { pageTitle: TITLE.HOME, problems });
};

exports.getProblemDetail = (req, res) => {
  const id = Number(req.params.id);
  const problem = problems.filter(problem => problem.id === id)[0];
  const pageTitle = problem.title;

  res.render("problemDetail", {
    pageTitle,
    problem,
    parameter: "n",
  });
};

exports.postSolution = (req, res) => {
  const userSolution = new Function(`return ${req.body.solution}`);

  console.log(userSolution);
}
