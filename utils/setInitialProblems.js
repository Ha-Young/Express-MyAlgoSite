const Problem = require('../models/Problem');
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

async function setInitialProblems() {
  const isCollectionEmpty = await Problem.countDocuments() === 0;

  if(!isCollectionEmpty) return;

  const initalProblems = await readFile(
    __dirname + '/../models/sample_problems.json',
    'utf8'
  );
  const parsedProblems = JSON.parse(initalProblems);

  parsedProblems.forEach(async (problem) => {
    await Problem.create(problem);
  });
}

module.exports = setInitialProblems;
