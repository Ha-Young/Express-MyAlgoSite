const createError = require("http-errors");
const mongoose = require("mongoose");

const Problem = require("../../models/Problem");
const User = require("../../models/User");

exports.getAllProblems = async (req, res, next) => {
  const problems = await Problem.find();

  res.locals.problems = problems;
  next();
};

exports.getProblems = async (req, res, next) => {
  try {
    const level = req.params.level;
    const problems = await Problem.find({ difficultyLevel: level });

    res.locals.problems = problems;
    next();
  } catch (err) {
    next(createError(400, "problem level param is wrong."));
  }
};

exports.renderResult = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const problem = await Problem.findOne({ id });
    const { status, results } = await problem.checkCode(req.body.code, next);
    const user = await User.findById(req.user.id);
    const userProblem = user.problems.filter((problem) => problem.id === id);

    if (userProblem.length === 0) {
      user.problems.push({
        id,
        status,
        code: req.body.code,
      });
      await user.save();
    } else {
      await User.updateOne(
        { "problems.id": id },
        {
          "problems.$.status": status,
          "problems.$.code": req.body.code,
        }
      );
    }

    res.locals.results = results;
    res.locals.prevCode = req.body.code;
    res.locals.problem = problem;

    if (status === "success") {
      await problem.save();
      res.render("success");
    } else {
      res.render("failure");
    }
  } catch (err) {
    next(createError())
  }
};
