const ObjectId = require('mongoose').Types.ObjectId;
const Problem = require('../models/Problem');

const problemsController = {
  getProblem: async (req, res) => {
    const id = req.params.problem_id;
    const problem = await Problem.findById(ObjectId(id));

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
          actual = new Function('solution', `return ${test.code}`)(solution).toString();
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

      // 서버 에러 핸들링
      return res.render('error', {
        message: err.message,
        error: err
      });
    }
  }
};

module.exports = problemsController;
