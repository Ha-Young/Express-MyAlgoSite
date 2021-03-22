const Problem = require("../../models/Problem");

exports.getAll = async function (req, res, next) {
  const problems = await Problem.find();

  res.render("index", { problems });
};
