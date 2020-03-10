const fs = require('fs');
const path = require('path');
const Problem = require('../models/Problem');
const Test = require('../models/Test');
const every = require('async/every');

const getHome = async (req, res, next) => {
  try {
    const problems = await Problem.find();

    res.render('index', { problems });
  } catch (err) {
    console.log(err);
  }
};

const getProblemsDetail = async (req, res, next) => {
  try {
    const id = req.params.problem_id;
    const problem = await Problem.findById(id);

    res.render('problemDetail', { problem });
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
        console.log('All tests passed!');
      } else {
        console.log('All tests should passed!');
      }
    });

    res.send(code);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getHome, getProblemsDetail, postProblemsDetail };
