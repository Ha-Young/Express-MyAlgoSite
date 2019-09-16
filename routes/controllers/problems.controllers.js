const Problem = require('../../models/Problem');

exports.getAll = async function (req, res, next) {
  try {
    const problems = await Problem.find();

    res.render('index', {
      success_msg: req.session.flash.success,
      title: '바닐라코딩',
      userInfo: {
        username: res.req.user.nickname,
        platformName: res.req.user.platform_name,
        profileImageUrl: res.req.user.profile_image_url
      },
      problems
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getProblemDetail = async function (req, res, next) {
  const problemId = Number(req.params.problem_id);
  try {
    const problem = await Problem.find({
      id: problemId
    });

    res.render('problem', {
      title: '바닐라코딩',
      userInfo: {
        username: res.req.user.nickname,
        platformName: res.req.user.platform_name,
        profileImageUrl: res.req.user.profile_image_url
      },
      problemDetail: problem[0]
    });
  } catch (err) {
    console.error(err);
  }
};

exports.createUserSolution = async function (req, res, next) {
  console.log('post requestttttt')
  console.log(req.body);
  try {
    
  } catch (err) {
    console.error(err);
  }
};
