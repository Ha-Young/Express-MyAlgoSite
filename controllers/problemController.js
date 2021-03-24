const Problem = require("../models/Problem");
const User = require("../models/User");
const mongoose = require("mongoose");
const createError = require("http-errors");

exports.fetchAllProblems = async function(req, res, next) {
  try {
    const problems = await Problem.find().lean();
    const { displayName } = req.user;

    res.render("index", { title: "Codewars", problems, displayName });
    //res.render("index", { layout: "./layouts/index_layout", title: "Codewars", displayName, problems });
  } catch (err) {
    next(createError(500, "failed fetching problems from db"));
  }
}

exports.getSelectedProblem = async function(req, res, next) {
  try {
    const { user: { displayName }, params: { problemId } } = req;
    const selectedProblem = await Problem.findOne({ problemId });

    res.render("problem", { title: "problem", selectedProblem, displayName });

  } catch(err) {
    next(createError(500), "failed to fetch probelm from db");
  }
}

exports.postSelectedProblemSolution = async function(req, res, next) {
  try {
    console.log(req);
  } catch (err) {

  }
}