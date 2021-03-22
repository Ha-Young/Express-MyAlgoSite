const Problem = require("../../models/Problem");
const createError = require("http-errors");

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();
    
    res.render("index", { title: "바닐라코딩", problems, });
  } catch (error) {
    next(createError(500));
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { problem_id: problemId } = req.params;
    console.log(problemId);
    const problem = await Problem.findById(problemId);
    console.log(25);
    console.log(problem);
    res.render("problem", { problem });
  } catch (error) {
    next(createError(500));
  }
};
