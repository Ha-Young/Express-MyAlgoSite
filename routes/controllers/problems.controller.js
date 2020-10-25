const Problem = require('../../models/Problem');
const vm = require('vm');
const dbError = require('../../errors/dbError');
const { PROBLEM, FAILURE } = require('../../constants/index');

const dbErr = new dbError('error occured while getting problem data', 500);

exports.getAll = asyncWrapper(async function(req, res, next) {
  const problems = await Problem.find().lean();

  return problems.sort((a, b) => Number(a.number) - Number(b.number));
});

exports.getOne = asyncWrapper(async function(req, res, next) {
  const result = await Problem.findOne(req.params);

  if (!result) {
    next(dbErr);

    return;
  }

  res.status(200).render(
    PROBLEM,
    {
      number: result.number,
      title: result.title,
      description: result.description,
      tests: result.tests,
    }
  );
});

exports.submitHandler = asyncWrapper(async function(req, res, next) {
  const problemData = await Problem.findOne(req.params);

  if (!problemData) {
    next(dbErr);

    return;
  }

  const { tests } = problemData;

  for (let i = 0; i < tests.length; i++) {
    const { code, solution } = tests[i];

    let answer;

    const info = {
      error: null,
      failureData: {
        code: '',
        answer: '',
        solution: '',
      },
      number: req.params.number,
    };

    try {
      const script = new vm.Script(req.body.code + code);

      answer = script.runInContext(vm.createContext(), { timeout: 2000 });
    } catch (err) {
      info.error = err;

      res.status(200).render(FAILURE, { info });

      return;
    }

    if (answer !== solution) {
      info.failureData.code = code;
      info.failureData.answer = answer;
      info.failureData.solution = solution;

      res.status(200).render(FAILURE, { info });

      return;
    }
  }

  next();
});

function asyncWrapper(fn) {
  return async function(req, res, next) {
    try {
      return await fn(req, res, next);
    } catch {
      next;
    }
  };
}
