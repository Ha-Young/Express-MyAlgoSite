const Problem = require(`${__dirname}/../../models/Problem`);

exports.getHome = async (req, res, next) => {
  const problems = await Problem.find({}).exec();
  res.locals.problems = problems;
  res.render("index");
};
