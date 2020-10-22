const Problem = require('../../models/Problem');

exports.getAll = async function(req, res, next) {
  try {
    return await Problem.find().lean();
  } catch (err) {
    next(err);
  }
};

exports.getOne = async function(req, res, next) {
  try {
    const result = await Problem.findOne(req.params);

    res.render(
      'problem',
      {
        problemNumber: result.problemNumber,
        title: result.title,
        description: result.description,
        tests: result.tests,
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.submitCode = async function(req, res, next) {
  console.log(req.user);
  console.log(req.body);
  let problemData;

  try {
    const submittedFunction = new Function(`return ${req.body.code};`)();

    problemData = await Problem.findOne(req.params);
    console.log(problemData);
    const tests = problemData.tests;

    for (let i = 0; i < tests.length; i++) {
      const code = tests[i].code;
      const solution = tests[i].solution;
      let answer;
      let info = {
        error: null,
        failureData: {},
        problemNumber: req.params.problemNumber,
      };

      try {
        answer = new Function('solution', `return ${code};`)(submittedFunction);
      } catch (err) {
        info.error = err;

        res.render('failure', { info });

        return;
      }

      if (answer !== solution) {
        isCorrect = false;

        info.failureData.code = code;
        info.failureData.answer = answer;
        info.failureData.solution = solution;

        res.render('failure', { info });

        return;
      }
    }

    problemData.completed_users++;

    await Problem.findOneAndUpdate(
      req.params,
      problemData,
      { new: true }
    );

    res.render('success');
  } catch (err) {
    res.render('error', { err });
  }
};
