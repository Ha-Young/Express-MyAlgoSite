import mongoose from 'mongoose';
import createError from 'http-errors';
import vm2 from 'vm2';
import _ from 'lodash';
import Problem from '../../models/Problem';

export const getProblemById = async (req, res, next) => {
  const { ObjectId } = mongoose.Types;
  const { problem_id: problemId } = req.params;

  if (!ObjectId.isValid(problemId)) {
    return next(createError(400));
  }

  try {
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return next(createError(404));
    }

    res.locals.problem = problem;
    next();
  } catch (e) {
    next(createError(500));
  }
};

export const renderProblem = (req, res) => {
  const { problem } = res.locals;
  res.render('problem', { title: `문제 연습 - ${problem.title}` });
};

export const confirmSolution = (req, res, next) => {
  const { problem } = res.locals;
  const { user_code: userCode } = req.body;
  const vm = new vm2.VM();
  const failureTestsIndex = [];

  if (typeof userCode !== 'string') {
    return next(createError(400));
  }

  for (let i = 0; i < problem.tests.length; i++) {
    const test = problem.tests[i];

    try {
      const script = new vm2.VMScript(`${userCode}\n${test.code};`, 'solution.js');
      const userSolution = vm.run(script);

      if (!_.isEqual(userSolution, test.solution)) {
        failureTestsIndex.push(i);
      }
    } catch (error) {
      const errorStack = error.stack.split('at ')[0];
      return res.render('failure', { errorStack });
    }
  }

  if (failureTestsIndex.length) {
    res.render('failure', { failureTestsIndex });
  } else {
    res.render('success');
  }
};
