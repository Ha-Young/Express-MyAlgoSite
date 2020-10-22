const Problem = require('../models/Problem');

exports.renderMainPage = async (req, res, next) => {
  const problems = await Problem.find();
  res.render('index', { data: problems });
};
