const Problem = require("../models/Problem");
const User = require("../models/User");
const mongoose = require("mongoose");
const createError = require("http-errors");

exports.getUserSolutions = async function(req, res, next) {
    try {
      //const { user: { solvedProblems, _id }, params: { problemId } } = req;
      //const { solvedProble } = await User.findOne({ _id });
      const { solvedProblem, _id } = req.user;
        const a = await Problem.findOne()

      console.log(solvedProblem, "!??!?")
   


     console.log(a, "bbbbbb")

      res.render("mySolutions");
  
    } catch(err) {
      next(createError(500), "failed to fetch probelm from db");
    }
  }