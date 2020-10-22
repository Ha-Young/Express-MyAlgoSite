const vm = require('vm');
const Problem = require('../models/Problem');

exports.renderMainPage = async (req, res, next) => {
  const problems = await Problem.find();
  res.render('index', { data: problems });
};

exports.getProblem = async (req, res, next) => {
  const id = req.params.problem_id;
  const problem = await Problem.find({ id });

  res.render('problem', {
    id: problem[0].id,
    title: problem[0].title,
    level: problem[0].difficulty_level,
    completeUsers: problem[0].complete_user,
    description: problem[0].description,
  });
};

exports.receiveUserSolution = async (req, res, next) => {
  const problemNumber = req.params.problem_id;
  const problem = await Problem.find({ id: problemNumber });
  const solution = await new Function(`return ${req.body.code}`)();

  const context = { solution };
  vm.createContext(context);

  let isAnswer = true;
  problem[0].tests.forEach(async (test) => {
    const code = `var result = ${test.code};`;
    vm.runInContext(code, context);
    const asnwerSheet = Number(test.solution) || test.solution;

    if (asnwerSheet === 'false' || asnwerSheet === 'true') {
      asnwerSheet = Boolean(asnwerSheet);
    }

    if (context.result !== asnwerSheet) {
      return (isAnswer = false);
    }
  });
  return isAnswer ? res.render('success') : res.render('failure');
};

exports.filterByLevel = (req, res, next) => {
  console.log(req.body.level);
  console.log(req.query);
  res.send('lelve');
};
