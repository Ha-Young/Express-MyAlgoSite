const Problem = require("../models/Problem");
const { getArgument, getResultList, getUserAnwerList } = require("../utils/solution");

exports.home = async (req, res) => {
  problems = await Problem.find().lean();

  res.render("home", { problems });
};

exports.getProblemDetail = async (req, res) => {
  const id = Number(req.params.id);
  const problem = await Problem.findOne({ id });
  const pageTitle = problem.title;

  res.render("problemDetail", {
    pageTitle,
    problem,
    parameter: "arg",
  });
};

exports.postSolution = async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const problem = await Problem.findOne({ id }).lean();
    const userSolution = new Function(`return ${req.body.solution}`)();
    const problemArgList = [];
    const problemAnswerList = [];

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
