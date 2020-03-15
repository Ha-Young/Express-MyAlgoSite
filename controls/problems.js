const vm = require('vm');
const Problem = require('../models/Problem');
const Test = require('../models/Test');
const errors = require('../lib/error');

const getHome = async (req, res, next) => {
  try {
    const problems = await Problem.find();

    res.render('index', { title: '코딩 전쟁이 일어난다. 모든 대원들, 전투 준비!', problems });
  } catch (err) {
    next(new errors.GeneralError(err.message));
  }
};

const getAddCase = (req, res, next) => {
  const id = req.params.problem_id;

  if (!id) {
    res.redirect('/');
    return;
  }

  res.render('addCase', { title: '케이스 추가하기', id })
}

const postAddCase = async (req, res, next) => {
  try {
    const id = req.params.problem_id;
    const { question, answer } = req.body;

    if (!question.trim().length || !answer.trim().length) {
      throw new errors.ValidationError(`입력한 값이 빈 문자열입니다.`, question && answer);
    }
    
    if (question.trim() !== question) {
      throw new errors.ValidationError('입력한 code값이 유효하지 않습니다.', question);
    }

    if (answer.trim() !== answer) {
      throw new errors.ValidationError('입력한 solution값이 유효하지 않습니다.', answer);
    }

    const problem = await Problem.findById(id);
    const newTest = await Test.create({
      code: question,
      solution: answer
    });

    problem.tests.push(newTest.id);
    await problem.save();

    res.redirect(`/problems/${id}`);
  } catch (err) {
    if (err instanceof errors.ValidationError) {
      return next(err);
    }

    if (err instanceof mongoose.Error.ValidationError) {
      return next(
        new errors.ValidationError(err.message, err.errors.owner.path)
      );
    }

    next(new errors.GeneralError(err.message));
  }
};

const getProblemsDetail = async (req, res, next) => {
  const id = req.params.problem_id;

  if (!id) {
    res.redirect('/');
    return;
  }

  try {
    const problem = await Problem.findById(id);

    res.render('problemDetail', { title: problem.title, problem });
  } catch (err) {
    next(new errors.GeneralError(err.message));
  }
};

const postProblemsDetail = async (req, res, next) => {
  try {
    const id = req.params.problem_id;
    const submitedCode = req.body.code;
    const problem = await Problem.findById(id).populate('tests');
    const tests = problem.tests;
    let isPassTests = false;
    let context, i;

    for (i = 0; i < tests.length; i++) {
      try {
        const { code, solution } = tests[i];
        const script = new vm.Script(
          `${submitedCode}\n` +
          `result = ${code};\n` +
          `${code} === expect;`
        );

        context = vm.createContext({
          id,
          expect: solution,
          test: code
        });

        const result = script.runInContext(context);

        if (!result) {
          break;
        }
      } catch (err) {
        context.error = err.message;
        req.session.context = context;
        res.redirect(`/failure`);
        return;
      }
    }

    if (i === tests.length) {
      isPassTests = true;
    }

    req.session.context = context;

    if(isPassTests) {
      res.redirect(`/success`);
    } else {
      res.redirect(`/failure`);
    }
  } catch (err) {
    next(new errors.GeneralError(err.message));
  }
};

const getSuccess = (req, res) => {
  const { id } = req.session.context;

  if (!id) {
    res.redirect('/');
    return;
  }

  res.render('success', { title: '테스트를 모두 통과했습니다.', id });
};

const getFailure = (req, res) => {
  const { id, test, expect, result, error } = req.session.context;

  if (!id) {
    res.redirect('/');
    return;
  }

  res.render('failure', {
    title: '테스트를 통과하지 못했습니다.',
    id,
    test,
    expect,
    result,
    error
  });
};

module.exports = {
  getHome,
  getAddCase,
  postAddCase,
  getProblemsDetail,
  postProblemsDetail,
  getSuccess,
  getFailure
};
