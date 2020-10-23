const express = require('express');
const Problem = require('../models/Problem');
const TriedProblem = require('../models/TriedProblem');
const { runCode } = require('../util/api');
const router = express.Router();

router.get('/:problemId', async (req, res, next) => {
  const { problemId } = req.params;
  const userId = req.user._id;

  try {
    const problem = await Problem.findOne({ _id: problemId });

    if (problem === null) {
      const err = new Error('PAGE NOT FOUND');
      err.status = 404;
      next(err);
    } else {
      let triedProblem = await TriedProblem.findOne({ userId: userId, problemId: problemId });

      if (triedProblem === null) triedProblem = { code: 'function solution () {\n\n}' };
      res.render('problems', {
        userInfo: req.user,
        problem: problem,
        triedProblem: triedProblem,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:problemId', async (req, res, next) => {
  const userId = req.user._id;
  const { problemId } = req.params;
  const { code } = req.body;

  try {
    const problem = await Problem.findOne({ _id: problemId });
    const testResults = await runCode(code, problem.tests);
    const findResult = await TriedProblem.findOne({ userId: userId, problemId: problemId });

    if (findResult) {
      await TriedProblem.findOneAndUpdate({ userId: userId, problemId: problemId }, { result: testResults, code: code });
    } else {
      await TriedProblem.create({
        userId: userId,
        problemId: problemId,
        result: testResults,
        code: code,
      });
    }
    res.redirect(`/problems/${problemId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
