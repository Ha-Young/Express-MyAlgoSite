const Problem = require('../models/Problem');
const sampleProblems = require("../models/sample_problems.json");


const storeSampleProblems = async () => {
  for (let i = 0; i < sampleProblems.length; i++) {
    await new Problem(sampleProblems[i]).save();
  }
};

exports.storeSampleProblems = storeSampleProblems;
