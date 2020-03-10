const Problems = require('../models/Problem');

const getHome = async (req, res, next) => {
  const problems = await Problems.find();
  res.render('index', { problems });
};

const getProblemsDetail = async (req, res, next) => {
  const id = req.params.problem_id;
  const problem = await Problems.findById(id);

  res.render('problemDetail', { problem });
};

const postProblemsDetail = (req, res, next) => {
  const id = Number(req.params.problem_id);
  const code = req.body.code;

  res.send(code);
};

module.exports = { getHome, getProblemsDetail, postProblemsDetail };
