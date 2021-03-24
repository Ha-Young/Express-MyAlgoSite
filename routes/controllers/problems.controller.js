const Problem = require("../../models/Problem");

exports.getAll = async function (req, res, next) {
  await Problem.find()
    .lean()
    .exec((err, problems) => {
      if (!problems.length) return res.status(500).send(err);
      res.render("index", { problems });
    });
};

exports.showProblem = async function (req, res, next) {
  const { problem_id: problemId } = req.params;

  await Problem.findById(problemId)
    .exec((err, problem) => {
      if (err) return res.status(400).json({ error: "invalid problem id" });
      res.render("problem", { problem });
    });
};
