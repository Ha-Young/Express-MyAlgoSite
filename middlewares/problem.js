const createError = require("http-errors");

function verifyProblemId (req, res, next) {
  const { problem_id: id } = req.params;

  if (!id) {
    // add: handle error in detail!
    next(createError(404));
    return;
  }

  res.locals.problemId = id;
  next();
}

exports.verifyProblemId = verifyProblemId;
