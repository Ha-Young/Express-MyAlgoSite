exports.getProblem = (req, res, next) => {
  const { problem_id } = req.params;

  res.render('problem', { problem_id });
};

exports.postProblem = (req, res, next) => {
  const { problem_id } = req.params;
  const isCorrect = true;

  if (isCorrect) {
    res.render('success', { problem_id });
  } else {
    res.render('failure', { problem_id });
  }
};
