const problems =  require('../models/sample_problems.json');

const getProblemsDetail = (req, res, next) => {
  const id = Number(req.params.problem_id);
  const problem = problems.find(problem => problem.id === id);

  res.render('problemDetail', { problem });
};

const postProblemsDetail = (req, res, next) => {
  const id = Number(req.params.problem_id);
  const code = req.body.code;

  res.send(code);
};

module.exports = { getProblemsDetail, postProblemsDetail };
