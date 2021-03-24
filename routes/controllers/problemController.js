const Problem = require("../../models/Problem");

exports.renderProblemPageById = async function (req, res, next) {
  console.log("req id", req.params.id);
  const requestedId = req.params.id;

  const fetchedProblem = await Problem.findById(requestedId);
  console.log("find probleme", fetchedProblem);

  res.status(200).render("problem", { problem: fetchedProblem });
};
