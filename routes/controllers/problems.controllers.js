const Problem = require('../../models/Problem');

exports.getProblems = async function (req, res, next) {
  try {
    let problems;
    const params = req.headers.params;

    if (!params || params === 'all') {
      problems = await Problem.find();

      if (!params) {
        res.render('index', {
          title: '바닐라코딩',
          userInfo: {
            username: req.user.nickname,
            platformName: req.user.platform_name,
            profileImageUrl: req.user.profile_image_url
          },
          problems
        });
        return;
      }

      res.json({ problems });
    } else {
      problems = await Problem.find({ difficulty_level: Number(params) });
      res.json({ problems });
    }
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
    next(err);
  }
};

exports.createUserSolution = async function (req, res, next) {
  try {
    const userSolution = req.body.user_solution;
    const problemId = req.params.problem_id;
    const problem = await Problem.findById(problemId);
    console.log('problem', problem);

    let userResult;
    const verifyUserSolution = problem.tests.find(test => {
      const testParams = test.params;
      const testResult = test.solution;

      console.log('testParams',testParams);
      console.log('user solution', userSolution);
      let solution;
      let result;
      try {
        solution = new Function('return ' + userSolution)();
        console.log('solution',solution);
        result = solution.apply(this, testParams);
      } catch (err) {
        console.log('msg',err.message);
        console.log('stack',err.stack);
        console.log('name',err.name)

        res.render('failure', {
          title: '바닐라코딩',
            userInfo: {
              username: req.user.nickname,
              platformName: req.user.platform_name,
              profileImageUrl: req.user.profile_image_url
            },
            expected: '-',
            received: '-',
            err,
        });
      }

      userResult = result;
      return testResult !== result;
    });

    if (!verifyUserSolution) {
      await Problem.update({ _id: problemId }, { $addToSet: { completed_users: req.user._id } });

      res.render('success', {
        title: '바닐라코딩',
        userInfo: {
          username: req.user.nickname,
          platformName: req.user.platform_name,
          profileImageUrl: req.user.profile_image_url
        }
      });
      console.log('모두통과!!');
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
        err: '-'
      });
      console.log(userResult + '이 아니고 '+verifyUserSolution.solution+'이 답이다.')
    }


  } catch (err) {
    console.error(err);
    next(err);
  }
};
