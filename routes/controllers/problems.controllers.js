const vm = require('vm');
const Problem = require('../../models/Problem');

exports.getProblems = async function (req, res, next) {
  try {
    const level = req.params.level;
    let problems;

    if (level) {
      problems = await Problem.find({ difficulty_level: Number(level) });
    } else {
      problems = await Problem.find();
    }

    if (!problems.length) {
      problems = 'No-Data';
    }

    res.render('index', {
      title: '바닐라코딩',
      userInfo: {
        username: req.user.nickname,
        platformName: req.user.platform_name,
        profileImageUrl: req.user.profile_image_url
      },
      problems,
      level: level
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getProblemDetail = async function (req, res, next) {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findById(problemId);

    res.render('problem', {
      title: '바닐라코딩',
      userInfo: {
        username: req.user.nickname,
        platformName: req.user.platform_name,
        profileImageUrl: req.user.profile_image_url
      },
      problemDetail: problem
    });
  } catch (err) {
    console.error(err);

    if (err.name === 'CastError') {
      err.status = 404;
    }
    next(err);
  }
};

exports.createUserSolution = async function (req, res, next) {
  try {
    const userSolution = req.body.user_solution;
    const problemId = req.params.problem_id;
    const problem = await Problem.findById(problemId);

    let userResult;

    const verifyUserSolution = problem.tests.find(test => {
      const testCode = test.code;
      const testResult = test.solution;

      let result;
      try {
        const userScript = new vm.Script(userSolution + testCode);
        const context = vm.createContext();

        result = userScript.runInThisContext(context);
      } catch (err) {
        res.render('failure', {
          title: '바닐라코딩',
            userInfo: {
              username: req.user.nickname,
              platformName: req.user.platform_name,
              profileImageUrl: req.user.profile_image_url
            },
            expected: '-',
            received: '-',
            testCode,
            errStack: err.stack
        });
      }

      userResult = result;
      return testResult !== result;
    });

    if (!verifyUserSolution) {
      await Problem.updateOne({ _id: problemId }, { $addToSet: { completed_users: req.user._id } });

      res.render('success', {
        title: '바닐라코딩',
        userInfo: {
          username: req.user.nickname,
          platformName: req.user.platform_name,
          profileImageUrl: req.user.profile_image_url
        },
        testCode: problem.tests
      });
    } else {
      res.render('failure', {
        title: '바닐라코딩',
        userInfo: {
          username: req.user.nickname,
          platformName: req.user.platform_name,
          profileImageUrl: req.user.profile_image_url
        },
        expected: verifyUserSolution.solution,
        received: userResult,
        testCode: verifyUserSolution.code,
        errStack: '-'
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
