const creatError = require('http-errors');
const { VM } = require('vm2');
const Problem = require('../../models/Problem');
const User = require('../../models/User');
const Submission = require('../../models/Submission');

exports.getAll = async function (req, res, next) {
  try {
    const userInfo = await User.findById(req.session.passport.user);
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
  try {
    const userInfo = await User.findById(req.session.passport.user);
    const targetProblemId = parseInt(req.params['problem_id']);
    const targetProblem = await Problem.findOne({ id: targetProblemId });

    res.status(200).render('problem', { problem: targetProblem, userInfo });
  } catch (err) {
    next(creatError(400, err));
  }
}
// TODO function is too big..
exports.getOneAndUpdateProblem = async function (req, res, next) {
  const userInfo = await User.findById(req.session.passport.user);
  const targetProblemId = parseInt(req.params['problem_id']);
  let targetProblem;

  try {
    targetProblem = await Problem.findOne({ id: targetProblemId });
  } catch (err) {
    return next(creatError(400, err));
  }

  const userSolution = req.body.solution;
  const judgeResult = [];
  const vm = new VM({
    timeout: 500,
    sandbox: {
      tests: targetProblem.tests,
      judgeResult,
    }
  });

  await Problem.findOneAndUpdate(
    { id: targetProblemId },
    { $inc: { submission: 1 }}
  );

  await User.findByIdAndUpdate(
    req.session.passport.user,
    {$inc : { total_submission: 1 }}
  );

  try {
    vm.run(`
      ${userSolution}

      for (let i = 0; i < tests.length; i++) {
        const actualReturn = eval(tests[i].code);

        if (eval(tests[i].code) === tests[i].solution) {
          judgeResult.push({ actualReturn, result: true});
        } else {
          judgeResult.push({ actualReturn, result: false});
        }
      }
    `);
  } catch (err) {
    // TODO error 띄우는게 맞지않나??
    return res.render('failure', { err, targetProblemId, failTests: targetProblem.tests, userInfo });
  }
  //TODO 여기도 에러 핸들링 필요함.
  if (judgeResult.every(testCase => testCase.result === true)) {
    await Problem.findOneAndUpdate(
      { id: targetProblemId },
      { $inc: { accepted: 1 }}
    );

    await User.findByIdAndUpdate(
      req.session.passport.user,
      {$inc : { accepted_submission: 1 }}
    );

    // const isFirstSubmission = await Submission.exists({ user_id: req.session.passport.user });

    // if (isFirstSubmission) {
    //   new Submission({
    //     user_id: req.session.passport.user,
    //     submission_history: {
    //       : userSolution
    //     }
    //   })
    // } else {
    //   await Submission.findOneAndUpdate(
    //     { user_id: req.session.passport.user },
    //     { submission_history: {
            
    //       }
    //     }
    //   )
    // }

    res.render('success', { userInfo });
  } else {
    const failTests = [];

    judgeResult.forEach((testResult, index) => {
      if (testResult.result === false) {
        failTests.push({expect: targetProblem.tests[index], actual: judgeResult[index].actualReturn});
      }
    });

    res.render('test', { failTests, userInfo, problem: targetProblem, userSolution });
  }
}
