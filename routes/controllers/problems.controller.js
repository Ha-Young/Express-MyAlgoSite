const Problem = require('../../models/Problem');

exports.getAll = async function(req, res, next) {
  try {
    const result = await Problem.find();

    return result;
  } catch (err) {
    next(err);
  }
};

exports.getOne = async function(req, res, next) {
  try {
    const result = await Problem.find(req.params);
    res.render(
      'problem',
      {
        problemNumber: result[0].problemNumber,
        title: result[0].title,
        description: result[0].description,
        tests: result[0].tests,
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.submitCode = async function(req, res, next) {
  try {
    const submittedFunction = new Function(`return ${req.body.code};`)();

    const problemData = await Problem.find(req.params);
    const tests = problemData[0].tests;

    for (let i = 0; i < tests.length; i++) {
      const code = tests[i].code;
      const solution = tests[i].solution;
      const answer = new Function('solution', `return ${code};`)(submittedFunction);
      const failureInfo = {
        problemNumber: req.params.problemNumber
      };

      if (answer !== solution) {
        isCorrect = false;

        failureInfo.code = code;
        failureInfo.answer = answer;
        failureInfo.solution = solution;

        res.render('failure', { info: failureInfo });

        return;
      }
    }

    res.render('success');
  } catch (err) {
    next(err);
  }
};
