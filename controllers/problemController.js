const Problem = require("../models/Problem");
const createHttpError = require("http-errors");
const { getArgument, getResultList, getUserAnwerList } = require("../utils/solution");

exports.home = async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();

    res.render("home", { problems });
  } catch (err) {
    next(createHttpError(500));
  }
};

exports.getProblemDetail = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    let problem;

    try {
      problem = await Problem.findOne({ id }).lean();
    } catch (err) {
      next(createHttpError(500));
    }

    res.render("problemDetail", {
      problem,
      parameter: "arg",
    });
  } catch (err) {
    next(createHttpError(404));
  }
};

exports.postSolution = async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const userSolution = new Function(`return ${req.body.solution}`)();
    const problemArgList = [];
    const problemAnswerList = [];
    let problem;

    try {
      problem = await Problem.findOne({ id }).lean();
    } catch (err) {
      next(createHttpError(500));
    }

    problem.tests.forEach(example => {
      problemArgList.push(getArgument(example.code)[0]);
      problemAnswerList.push(example.solution);
    });

    let userAnswerList;

    try {
      userAnswerList = getUserAnwerList(problemArgList, userSolution);
    } catch (err) {
      res.render("failure", { resultList: err });
      return;
    }

    const resultList = getResultList(problemAnswerList, userAnswerList);

    for (const result of resultList) {
      if (!result.output) {
        res.render("failure", { resultList });
        return;
      }
    }

    res.render("success", { resultList });
  } catch (err) {
    res.render("failure", { resultList: err });
  }
}
