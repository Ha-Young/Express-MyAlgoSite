const { User } = require("../models/User");
const { Problem } = require("../models/Problem");
let sortedUser;

exports.getHome = async (req, res, next) => {
  try {
    const problemList = await Problem.find().lean();
    const userList = await User.find().lean();
    sortedUser = userList.sort((a, b) => b.rating - a.rating).splice(0, 10);

    res.render("index", { data: { problemList, sortedUser, user: req.user } });
  } catch (err) {
    next(err);
  }
};

exports.getLevel = async (req, res, next) => {
  try {
    const level = parseInt(req.params.level);
    const currentLevelProblems = await Problem.find({
      difficulty: level,
    }).lean();

    res.render("index", {
      data: { problemList: currentLevelProblems, sortedUser, user: req.user },
    });
  } catch (err) {
    next(err);
  }
};

exports.getSolved = async (req, res, next) => {
  try {
    if (req.user) {
      const currentUser = await User.findById(req.user._id).lean();
      const solvedProblems = currentUser.solvedProblems;
      const solvedList = [];

      for (const problemId of solvedProblems) {
        const problem = await Problem.findById(problemId).lean();
        solvedList.push(problem);
      }

      res.render("index", {
        data: { problemList: solvedList, sortedUser, user: req.user },
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getUnsolved = async (req, res, next) => {
  try {
    if (req.user) {
      const currentUser = await User.findById(req.user._id).lean();
      const allProblems = await Problem.find().lean();
      const solvedProblems = currentUser.solvedProblems.map((problemId) =>
        problemId.toString()
      );
      const unsolvedList = allProblems.filter(
        (problem) => solvedProblems.indexOf(problem._id.toString()) === -1
      );

      res.render("index", {
        data: { problemList: unsolvedList, sortedUser, user: req.user },
      });
    }
  } catch (err) {
    next(err);
  }
};
