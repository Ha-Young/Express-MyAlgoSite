const Problem = require("../models/Problem");

module.exports.mainController = async function mainController(req, res, next) {
  if (req.user) {
    const allProblems = await Problem.find({});
    return res.render("problemList", { problems: allProblems, user: req.user });
  }

  res.render("index", { title: "codeWars", isNeedLogin: true });
}
