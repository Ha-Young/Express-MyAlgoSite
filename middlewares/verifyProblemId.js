const createError = require("http-errors");
const Problem = require("../models/Problem");

async function verifyProblemId (req, res, next) {
  try {
    const problems = await Problem.find().lean();
    const problemNumbers = problems.length;
    const problemId = Number(req.params.problemId);

    if (problemId > 0 || problemId <= problemNumbers) {
      next();
      return;
    }

    next(createError(404, "Page Not Found"));
  } catch(err) {
    next(err)
  }
}

module.exports = verifyProblemId;
