const vm = require('vm');
const User = require('../../models/User');
const Problem = require('../../models/Problem');

exports.getUserCode = async function (req, res, next) {
  try {
    const currentUser = await User.findOne({ _id : req.user._id });
    const currentProblem = await currentUser.success_problems.find((problem => {
      return problem.problem_id === req.params.problemId;
    }));
    req.writtenCode = currentProblem.written_code || req.cookies.writtenCode || 'function solution () {};';
    next();
  } catch (error) {
    next();
  }
};

exports.getProgramInfo = async function (req, res, next) {
  try {
    const problem = await Problem.findOne({ _id : req.params.problemId });
    res.render('problem', {
      title: '바닐라코딩',
      problem,
      writtenCode : req.writtenCode
    });
  } catch (error) {
    next();
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
    const problem = await Problem.findOne({ _id : req.params.problemId });
    const submittedFn = req.body.code;
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
    req.resultMessages = resultMessages;
    next();
  } catch (error) {
    res.render('failure', { message : error.message });
  }
};


exports.checkAnswer = function (req, res, next) {
  console.log(req.resultMessages);
  const isRightCode = req.resultMessages.every((result) => {
    return result.isRightAnswer;
  })
  if (isRightCode) {
    next();
  } else {
    res.render('failure', { message : '', resultMessages: req.resultMessages });
  }
};


exports.updateSuccessCodeToUser = async function (req, res, next) {
  try {
    const targetUser = await User.findById(req.user._id);
    const successProblems = targetUser.success_problems.findIndex((problem => {
      return problem.problem_id === req.params.problemId;
    }));

    if (successProblems > -1) {
      await targetUser.success_problems[successProblems].remove();
    }

    await targetUser.success_problems
      .push({
        problem_id: req.params.problemId,
        written_code : req.body.code,
        updated_at : new Date().toISOString(),
      });
    targetUser.save();

    if (successProblems === -1) {
      next();
    } else {
      res.render('success');
    }

  } catch (error) {
    next();
  }
};

exports.updateSuccessUserToProblem = async function (req, res, next) {
  try {
    await Problem.findByIdAndUpdate(
      req.params.problemId,
      { $inc: { completed_users: 1 }  }
    );
    res.render('success');
  } catch (error) {
    next();
  }
};
