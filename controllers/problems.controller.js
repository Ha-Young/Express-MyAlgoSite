const ObjectId = require('mongoose').Types.ObjectId;
const Problem = require('../models/Problem');
const { render } = require('node-sass');

const problemsController = {
  getfilteredProblems: async (req, res) => {
    const level = req.query.level;
    const problems = await Problem.find({ difficulty_level: level });

    res.locals.isAuthenticated = true;
    res.locals.username = req.user.username;

    res.render('index', { problems });
  },

  getProblem: async (req, res) => {
    const id = req.params.problem_id;
    const problem = await Problem.findById(ObjectId(id));

    res.locals.isAuthenticated = true,
    res.locals.username = req.user[0].username;

    res.render('problem', { problem });
  },

  postSolution: async (req, res) => {
    try {
      const id = req.params.problem_id;
      const problem = await Problem.findById(ObjectId(id));
      const solution = new Function('x', `return (${req.body.codeMirror})(x)`);

      let allPass = true;
      let executionError = null;
      const testResults = [];

      for (let i = 0; i < problem.tests.length; i++) {
        const test = problem.tests[i];

        let actual;
        const expected = test.solution;

        try {
          const executionResult = new Function('solution', `return ${test.code}`)(solution);

          actual = executionResult ? executionResult.toString() : undefined;
        } catch (error) {
          console.log('실행에러 발생! => ', error);
          allPass = false;
          executionError = error;
          break;
        }

        const passed = actual === expected;

        if (!passed) allPass = false;

        testResults.push({
          expected,
          actual,
          passed
        });
      }

      if (allPass) {
        return res.render('success', {
          problemId: id
        });
      } else {
        return res.render('failure', {
          problemId: id,
          testResults,
          error: executionError
        });
      }

    } catch (err) {
      console.error('error occurred => ', err);
      console.log(err.code);

      return res.render('error', {
        message: err.message,
        error: err
      });
    }
  }
};

module.exports = problemsController;
