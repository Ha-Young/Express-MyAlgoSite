const dotenv = require("dotenv");
const Problem = require("../../models/Problem");
dotenv.config();

exports.renderProblemsPage = async function (req, res, next) {
  const fetchedProblems = await Problem.find({});
  console.log("fetched", fetchedProblems);

  res
    .status(200)
    .render("problems", { title: "problems", data: fetchedProblems });
};

exports.renderProblemPageById = function (req, res, next) {
  res.status(200).render("problem", { title: "problem" });
};
