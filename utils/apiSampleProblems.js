const fs = require('fs');
const dotev = require('dotenv');
dotev.config({ path: './config.env' });
const Problem = require('../models/Problem');

const problems = JSON.parse(
  fs.readFileSync(`${__dirname}/../models/sample_problems.json`, 'utf-8')
);

exports.importProblems = async () => {
  
    await Problem.create(problems);
    console.log('data successfully loaded');
  
};

exports.deleteProblems = async () => {
  try {
    await Problem.deleteMany();
    console.log('data successfully delete');
  } catch (err) {
    console.log(err.code)
  }
};

// module.exports = async () => {
//   await deleteProblems();
//   await importProblems();
// };
