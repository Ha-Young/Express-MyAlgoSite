const createError = require("http-errors");
const Problem = require("../models/Problem");
const { ERROR_MESSAGE } = require("../utils/constants");

async function verifyProblemId (req, res, next) {
  try {
    const problems = await Problem.find().lean();
    const problemNumbers = problems.length;
    const problemId = Number(req.params.problemId);

    if (problemId > 0 || problemId <= problemNumbers) {
      next();
      return;
    }

    next(createError(404, ERROR_MESSAGE.PAGE_NOT_FOUND));
  } catch(err) {
    next(err);
  }
}

module.exports = verifyProblemId;
