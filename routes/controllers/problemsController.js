const Problem = require("../../models/Problem");

exports.renderProblemsPage = async function (req, res, next) {
  const fetchedProblems = await Problem.find({});

  res.status(200).render("problems", { problems: fetchedProblems });
};
