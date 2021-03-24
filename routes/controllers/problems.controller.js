const creatError = require('http-errors');
const { NodeVM } = require('vm2');
const Problem = require('../../models/Problem');
const User = require('../../models/User');

exports.getAll = async function (req, res, next) {
  const userInfo = await User.findById(req.session.passport.user);

  try {
    const problems = await Problem.find();
    const acceptedRatio = problems.map(problem => {
      if (problem.submission === 0) return 0;

      return ((problem.accepted * 100) / problem.submission).toFixed(2);
    });

    res.render('index', { problems, acceptedRatio, userInfo });
  } catch (err) {
    next(creatError(500, err));
  }
}

exports.getOneProblem = async function (req, res, next) {
  const userInfo = await User.findById(req.session.passport.user);

  try {
    const targetProblemId = parseInt(req.params['problem_id']);
    const targetProblem = await Problem.findOne({ id: targetProblemId });

    res.status(200).render('problem', { problem: targetProblem });
  } catch (err) {
    next(creatError(400, err));
  }
}

exports.getOneAndUpdateProblem = async function (req, res, next) {
  const targetProblemId = parseInt(req.params['problem_id']);
  let targetProblem;

  try {
    targetProblem = await Problem.findOne({ id: targetProblemId });
  } catch (err) {
    return next(creatError(400, err));
  }

  const userSolution = req.body.solution;
  const judgeResult = [];
  const vm = new NodeVM({
      console: 'inherit',
      sandbox: {
        tests: targetProblem.tests,
        judgeResult,
      }
  });

  try {
    vm.run(`
      ${userSolution}

      for (let i = 0; i < tests.length; i++) {
        if (eval(tests[i].code) !== tests[i].solution) {
          judgeResult.push(false);
        } else {
          judgeResult.push(true);
        }
      }
    `);
  } catch (err) {
    return res.render('failure', { err, targetProblemId, failTests: targetProblem.tests });
  }

  if (judgeResult.every(result => result === true)) {
    await Problem.findOneAndUpdate(
      { id: targetProblemId },
      {
        accepted: targetProblem.accepted + 1,
        submission: targetProblem.submission + 1
      }
    ).exec();

    res.render('success');
  } else {
    await Problem.findOneAndUpdate(
      { id: targetProblemId },
      { submission: targetProblem.submission + 1 }
    ).exec();

    const failTests = [];

    judgeResult.forEach((result, index) => {
      if (result === false) {
        failTests.push(targetProblem.tests[index]);
      }
    });

    res.render('failure', { failTests, targetProblemId, err: null });
  }
}
