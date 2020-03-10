const fs = require('fs');
const path = require('path');
const Problems = require('../models/Problem');

const getHome = async (req, res, next) => {
  const problems = await Problems.find();
  res.render('index', { problems });
};

const getProblemsDetail = async (req, res, next) => {
  const id = req.params.problem_id;
  const problem = await Problems.findById(id);

  res.render('problemDetail', { problem });
};

const postProblemsDetail = async (req, res, next) => {
  const id = Number(req.params.problem_id);
  const code = req.body.code;
  const handledCode = code + '\nmodule.exports = solution;\n';

  try {
    await fs.writeFileSync(
      path.join(__dirname, '../solutions/solution.js'),
      handledCode
    );

    const solution = require('../solutions/solution');

    solution();

    res.send(code);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getHome, getProblemsDetail, postProblemsDetail };
