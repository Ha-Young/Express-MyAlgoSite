const Problem = require(`${__dirname}/../../models/Problem`);

exports.getHome = async (req, res, next) => {
  delete req.session.userCode;
  delete req.session.problem;

  req.app.locals.isLogin = true;

  const problems = await Problem.find({}).exec();

  res.locals.problems = problems;
  res.locals.isLogin = res.app.locals.isLogin;

  return res.render("index");
};
