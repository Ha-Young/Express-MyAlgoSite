const fs = require('fs');
const dotev = require('dotenv');
dotev.config({ path: './config.env' });
const Problem = require('../models/Problem');

const problems = JSON.parse(
  fs.readFileSync(`${__dirname}/../models/sample_problems.json`, 'utf-8')
);

const importProblems = async () => {
  console.log('import');
  try {
    await Problem.create(problems);
    console.log('data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};

const deleteProblems = async () => {
  console.log('delete');
  try {
    await Problem.deleteMany();
    console.log('data successfully delete');
  } catch (err) {
    console.log(err);
  }
};

module.exports = async () => {
  await deleteProblems();
  await importProblems();
};
