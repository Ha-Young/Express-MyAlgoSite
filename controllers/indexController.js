const Problem = require("../models/Problem");

exports.getAllProblems = async (req, res) => {
  const tests = await Problem.find({});

  res.render("index", { tests });
};
