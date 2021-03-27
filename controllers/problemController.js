const Problem = require("../models/Problem");
const createHttpError = require("http-errors");
const { getSolution, getArgument, getResultList, getUserAnwerList } = require("../utils/solution");

exports.home = async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();

    res.render("home", { title: "Problems", problems });
  } catch (err) {
    console.log(err);
    next(createHttpError(500));
  }
};

exports.getProblemsByLevel = async (req, res, next) => {
  try {
    const { level } = req.params;
    const problems = await Problem.find({ difficultyLevel: level }).lean();

    if (!problems.length) {
      next(createHttpError(404));
      return;
    }

    res.render("home", { title: `Level ${level}`, problems });
  } catch (err) {
    console.log(err);
    next(createHttpError(500));
  }
};

exports.getProblemDetail = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const problem = await Problem.findOne({ id }).lean();

    if (!problem) {
      next(createHttpError(404));
      return;
    }

    res.render("problemDetail", {
      problem,
      parameter: "arg",
    });
  } catch (err) {
    console.log(err);
    next(createHttpError(500));
  }
};

exports.postSolution = async (req, res, next) => {
  try{
    const start = Date.now();
    const id = Number(req.params.id);
    const userSolution = new Function(`return ${getSolution(req.body.solution)}`)();
    const problemArgList = [];
    const problemAnswerList = [];
    let problem;

    try {
      problem = await Problem.findOne({ id }).lean();
    } catch (err) {
      console.log(err);
      next(createHttpError(500));
    }

    problem.tests.forEach(example => {
      problemArgList.push(getArgument(example.code)[0]);
      problemAnswerList.push(example.solution);
    });

    const end = Date.now();
    const runtime = `${end - start} ms`;

    let userAnswerList;

    try {
      userAnswerList = getUserAnwerList(problemArgList, userSolution);
    } catch (err) {
      console.log(err);
      res.render("failure", {
        layout: "../views/layouts/result",
        resultList: err,
        runtime,
      });

      return;
    }

    const resultList = getResultList(problemAnswerList, userAnswerList);

    for (const result of resultList) {
      if (!result.output) {
        res.render("failure", {
          layout: "../views/layouts/result",
          resultList,
          runtime,
        });

        return;
      }
    }

    res.render("success", {
      layout: "../views/layouts/result",
      resultList,
      runtime,
    });
  } catch (err) {
    res.render("failure", {
      layout: "../views/layouts/result",
      resultList: err,
      runtime,
    });
  }
};
