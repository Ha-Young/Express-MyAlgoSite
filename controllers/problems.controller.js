const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

exports.getProblem = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findOne({ _id: problemId });

    console.log(problem)
    res.render('problem', { problem: problem });
  } catch (err) {
    next(err);
  }
}

// exports.create = async (req, res, next) => {
//   try {

//   } catch (err) {

//   }
// }
