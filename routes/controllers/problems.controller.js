const mongoose = require("mongoose");
const Problem = require("../../models/Problem");

async function getProblems() {
  const problems = await Problem.find({});

  if (!problems.length) return null;

  return problems;
}

async function getProblem(id) {
  return await Problem.find({ id }).then((docs) => docs[0]);
}

async function saveUserSolution(model, id, solution) {
  return await model.findByIdAndUpdate(id, { solution }, { new: true });
}

module.exports = {
  getProblem,
  getProblems,
  saveUserSolution,
};
