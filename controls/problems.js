const Problem = require('../models/Problem');
const Test = require('../models/Test');

const getHome = async (req, res, next) => {
  try {
    const problems = await Problem.find();

    res.render('index', { title: '코딩 전쟁이 일어난다. 모든 대원들, 전투 준비!', problems });
  } catch (err) {
    console.log(err);
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
  const id = req.params.problem_id;
  const { question, answer } = req.body;
  const problem = await Problem.findById(id);

  const newTest = await Test.create({
    code: question,
    solution: answer
  });

  problem.tests.push(newTest.id);
  await problem.save();

  res.redirect(`/problems/${id}`);
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
    console.log(err);
  }
};

const postProblemsDetail = async (req, res, next) => {
  const id = req.params.problem_id;
  const code = req.body.code;
  const solutionProvider = new Function('return ' + code);
  const originSolution = solutionProvider();

  try {
    const problem = await Problem.findById(id).populate('tests');
    const tests = problem.tests;
    let isPassTests = true;

    for (let i = 0; i < tests.length; i++) {
      const { code, solution } = tests[i];
      const fn = new Function ('solution', 'return ' + code)
        .bind(null, originSolution);

      if(fn() !== solution) {
        isPassTests = false;
        break;
      }
    }

    if(isPassTests) {
      res.redirect(`/success?problem_id=${id}`);
    } else {
      res.redirect(`/failure?problem_id=${id}`);
    }
  } catch (err) {
    console.log(err);
  }
};

const getSuccess = (req, res) => {
  const id = req.query.problem_id;

  if (!id) {
    res.redirect('/');
    return;
  }

  res.render('success', { title: '테스트를 모두 통과했습니다.', id });
};

const getFailure = (req, res) => {
  const id = req.query.problem_id;

  if (!id) {
    res.redirect('/');
    return;
  }

  res.render('failure', { title: '테스트를 통과하지 못했습니다.', id });
};

module.exports = { getHome, getAddCase, postAddCase, getProblemsDetail, postProblemsDetail, getSuccess, getFailure };
