const vm = require('vm');
const User = require('../../models/User');
const Problem = require('../../models/Problem');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getProblemList = async (req, res, next) => {
  res.clearCookie('writtenCode');
  try {
    const problems = await Problem.find();
    const successList = req.user.solved_problems.map(problem => problem.problem_id);

    res.render('index', {
      title: '바닐라코딩',
      problems,
      userProfileImg: req.user.profile_img_url,
      userName: req.user.name,
      successList,
      userChallenging: problems.length - successList.length
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserCode = async function (req, res, next) {
  try {
    if (!ObjectId.isValid(req.user._id) || !ObjectId.isValid(req.params.problemId)) {
      return next();
    }
    const currentProblem = req.user.solved_problems.find(problem =>
      problem.problem_id === req.params.problemId
    );
    if (currentProblem) {
      res.locals.writtenCode = currentProblem.written_code;
    } else {
      res.locals.writtenCode = req.cookies.writtenCode || 'function solution () {};';
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.getProblemInfo = async function (req, res, next) {
  try {
    if (!ObjectId.isValid(req.params.problemId)) {
      return next();
    }

    const problem = await Problem.findOne({ _id : req.params.problemId });
    res.render('problem', {
      title: '바닐라코딩',
      problem,
      writtenCode : res.locals.writtenCode
    });
  } catch (error) {
    next(error);
  }
};

exports.setCodeCookie = function (req, res, next) {
  res.cookie('writtenCode', req.body.code, {
    maxAge: 10000
  });
  next();
};

exports.executeCode = async function (req, res, next) {
  const resultMessages = [];
  try {
    if (!ObjectId.isValid(req.params.problemId)) {
      return next();
    }

    const problem = await Problem.findOne({ _id : req.params.problemId });
    const submittedFn = req.body.code;
    try {
      problem.tests.forEach(test => {
        const code = `${submittedFn} ${test.code}`;
        const script = new vm.Script(code);
        const context = vm.createContext({});
        const submittedResult = script.runInContext(context, { timeout: 1000 });
        const testResult = {
          argument: test.code,
          expectedResult: test.solution,
          submittedResult
        };
        if (submittedResult !== test.solution) {
          testResult.isRightAnswer = false;
          testResult.correctMessage = `expected result is ${test.solution} but your result is ${submittedResult}`;
        } else {
          testResult.isRightAnswer = true;
          testResult.correctMessage = `Correct! your result is ${submittedResult}`;
        }
        resultMessages.push(testResult);
      });
      res.locals.resultMessages = resultMessages;
    } catch (error) {
      res.render('failure', { error });
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkAnswer = function (req, res, next) {
  const isRightCode = res.locals.resultMessages.every(result => result.isRightAnswer);

  if (isRightCode) {
    next();
  } else {
    res.render('failure', { resultMessages: res.locals.resultMessages });
  }
};

exports.updateSuccessCodeToUser = async function (req, res, next) {
  try {
    if (!ObjectId.isValid(req.user._id)) {
      return next();
    }

    const targetUser = await User.findById(req.user._id);
    const successProblems = targetUser.solved_problems.findIndex(problem =>
      problem.problem_id === req.params.problemId
    );

    if (successProblems > -1) {
      await targetUser.solved_problems[successProblems].remove();
    }

    targetUser.solved_problems
      .push({
        problem_id: req.params.problemId,
        written_code : req.body.code,
        updated_at : new Date().toISOString()
      });
    await targetUser.save();

    if (successProblems === -1) {
      next();
    } else {
      res.render('success');
    }

  } catch (error) {
    next(error);
  }
};

exports.updateSuccessUserToProblem = async function (req, res, next) {
  try {
    if (!ObjectId.isValid(req.params.problemId)) {
      return next();
    }

    await Problem.findByIdAndUpdate(
      req.params.problemId,
      { $inc: { completed_users: 1 } }
    );
    res.render('success');
  } catch (error) {
    next(error);
  }
};
