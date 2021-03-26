const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User");
const {
  getProblem,
  getProblems,
  saveUserSolution,
} = require("./controllers/problems.controller");

const getArgsAndBody = require("../utils/getArgsAndBody");
const makeAndExcuteSolutionFunc = require("../utils/makeAndExcuteSolutionFunc");
const findUserSolution = require("../utils/findUserSolution");

router.get("/", async (req, res, next) => {
  try {
    const problems = await getProblems();

    if (!problems) throw new Error();

    res.render("problems", { problems: problems, userName: req.user.username });
  } catch (err) {
    next(createError(500, "there are problems :("));
  }
});

router.get("/:problem_id", async (req, res, next) => {
  try {
    const { problem_id } = req.params;
    const problem = await getProblem(problem_id);
    const { username, solution } = req.user;
    const userSolution = findUserSolution(solution, problem_id);

    if (!problem) throw new Error();

    res.render("problem", {
      problem: problem,
      userName: username,
      solution: userSolution,
    });
  } catch (err) {
    next(createError(500, "There is no problem :("));
  }
});

router.post("/:problem_id", async (req, res, next) => {
  const { solution } = req.body;
  const { problem_id } = req.params;
  const { _id } = req.user;
  const loginStatus = res.locals.loginStatus;
  let tests;
  let userName = "";

  if (req.user) userName = req.user.username;

  try {
    const problem = await getProblem(problem_id);
    tests = problem.tests;
    await saveUserSolution(User, _id, problem_id, solution);
  } catch (err) {
    return next(createError(500, "There is no problem :("));
  }

  try {
    const { funcArgs, funcBody } = getArgsAndBody(solution);
    const testResults = makeAndExcuteSolutionFunc(funcArgs, funcBody, tests);
    const isPass = testResults.every((testResult) => testResult === true);
    if (isPass) {
      res.status(200).render("success", { userName, loginStatus });
    } else {
      res.status(200).render("failure", { userName, loginStatus });
    }
  } catch (err) {
    res.status(200).render("failure"), { userName, loginStatus };
  }
});

module.exports = router;
