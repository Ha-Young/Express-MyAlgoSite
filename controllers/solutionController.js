const User = require("../models/User");

exports.getMySolutions = async function(req, res, next) {
  try {
    const displayName = req.user.displayName;
    const finalSolutions = [];
    const { solvedProblems } = await User.findById(req.user._id)
      .populate("solvedProblems.solvedProblemObjectId")
      .exec();

    for (let solvedProblem of solvedProblems) {
      const format = {
        problemTitle: "",
        mySolution: ""
      };

      const title = solvedProblem.solvedProblemObjectId.title;
      const userCode = solvedProblem.userCode;

      format.problemTitle = title;
      format.mySolution = userCode;

      finalSolutions.push(format);
    }

    res.render("mySolutions", { title: "My Solution", solutions: finalSolutions, displayName });
  } catch(err) {
    next(err);
  }
};
