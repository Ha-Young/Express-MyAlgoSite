const fs = require('fs');
const path = require('path');
const Problem = require('../models/Problem');
const Test = require('../models/Test');
const every = require('async/every');

const getHome = async (req, res, next) => {
  try {
    const problems = await Problem.find();

    res.render('index', { title: '코딩 전쟁이 일어난다. 모든 대원들, 전투 준비!', problems });
  } catch (err) {
    console.log(err);
  }
};

const getProblemsDetail = async (req, res, next) => {
  try {
    const id = req.params.problem_id;
    const problem = await Problem.findById(id);

    res.render('problemDetail', { title: problem.title, problem });
  } catch (err) {
    console.log(err);
  }
};

const postProblemsDetail = async (req, res, next) => {
  const id = req.params.problem_id;
  const code = req.body.code;
  const handledCode = code + '\nmodule.exports = solution;\n';

  try {
    await fs.writeFileSync(
      path.join(__dirname, '../solutions/solution.js'),
      handledCode
    );

    const solution = require('../solutions/solution');
    const problem = await Problem.findById(id).populate('tests');
    const tests = problem.tests;

    every(tests, (item, callback) => {
      const testTemplate = 
        'module.exports = function (solution) {'
      +   `return ${item.code} == ${item.solution};`
      + '}';
      fs.writeFile(
        path.join(__dirname, '../solutions/test.js'),
        testTemplate,
        (err) => {
          callback(err, require('../solutions/test')(solution));
        }
      )
    }, function (err, result) {
      if(err) {
        console.log(err);
      }

      if(result) {
        res.redirect('/success');
      } else {
        res.redirect('/failure');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getSuccess = (req, res) => {
  res.render('success', { title: '테스트를 모두 통과했습니다.' });
};

const getFailure = (req, res) => {
  res.render('failure', { title: '테스트를 통과하지 못했습니다.' });
};

module.exports = { getHome, getProblemsDetail, postProblemsDetail, getSuccess, getFailure };
