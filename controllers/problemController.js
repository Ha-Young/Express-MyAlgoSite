const problems = require("../models/sample_problems.json");
const { TITLE } = require("../constants/common");
// const cm = require("codemirror/addon/runmode/runmode.node.js");

exports.home = (req, res) => {
  res.render("home", { pageTitle: TITLE.HOME, problems });
};

exports.getProblemDetail = async (req, res) => {
  const id = Number(req.params.id);
  const targetProblem = await problems.filter(problem => problem.id === id)[0];

  res.render("problemDetail", { pageTitle: targetProblem.title, problem: targetProblem });
}

exports.postSolution = (req, res) => {

}
