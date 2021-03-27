const createError = require("http-errors");

function verifyProblemId (req, res, next) {
  const { problem_id: id } = req.params;

  if (!id) {
    next(createError(404, "Not Found Error"));
    return;
  }

  res.locals.problemId = id;
  next();
}

exports.verifyProblemId = verifyProblemId;
