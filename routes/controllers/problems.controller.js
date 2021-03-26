const mongoose = require("mongoose");
const { findById } = require("../../models/Problem");
const Problem = require("../../models/Problem");

async function getProblems() {
  const problems = await Problem.find({});

  if (!problems.length) return null;

  return problems;
}

async function getProblem(id) {
  return await Problem.find({ id }).then((docs) => docs[0]);
}

async function saveUserSolution(model, id, problemId, solutionFunction) {
  const user = await model.findById(id, "solution");
  const solutions = user.solution;

  const solution = solutions.find(
    (solution) => solution.problemId === parseInt(problemId, 10),
  );

  if (solution) {
    solution.solutionFunction = solutionFunction;
  } else {
    solutions.push({ problemId, solutionFunction });
  }

  user.save();
}

module.exports = {
  getProblem,
  getProblems,
  saveUserSolution,
};
