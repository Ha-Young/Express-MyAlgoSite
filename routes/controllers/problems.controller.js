import mongoose from 'mongoose';
import createError from 'http-errors';
import Problem from '../../models/Problem';

export const getProblemById = async (req, res, next) => {
  const { ObjectId } = mongoose.Types;
  const { problem_id: problemId } = req.params;

  if (!ObjectId.isValid(problemId)) return next(createError(400));

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return next(createError(404));

    res.locals.problem = problem;
    next();
  } catch (e) {
    next(createError(400));
  }
};

export const renderProblem = async (req, res) => {
  const { problem } = res.locals;
  res.render('problem', { title: `문제 연습 - ${problem.title}`, problem });
};

export const confirmSolution = async (req, res) => {
  const { problem } = res.locals;
  const { string_code: stringCode } = req.body;
  const solution = new Function(`return ${stringCode}`)();

  const failureTestsIndex = [];

  console.log(problem.tests);

  for (let i = 0; i < problem.tests.length; i++) {
    const test = problem.tests[i];

    try {
      if (eval(test.code) !== test.solution) {
        failureTestsIndex.push(i);
      }
    } catch (error) {
      return res.render('failure', { error });
    }
  }

  // problem.tests.forEach(((test, index) => {
  //   try {
  //     if (eval(test.code) !== test.solution) {
  //       failureTestsIndex.push(index);
  //     }
  //   } catch (error) {
  //     return res.render('failure', { error });
  //   }
  // }));

  if (failureTestsIndex.length) {
    res.render('failure', { failureTestsIndex });
  } else {
    res.render('success');
  }
};
