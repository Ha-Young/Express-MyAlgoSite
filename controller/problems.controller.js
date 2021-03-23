const createError = require("http-errors");
const mongoose = require("mongoose");

const Problem = require("../models/Problem");

exports.get = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const user = await req.user;
    const problem = await Problem.findById(problemId);

    res.render("problem", {
      email: user.email,
      problem,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(createError(400, "invalid problem id"));
      return;
    }

    next(createError(500, err.message));
  }
};
