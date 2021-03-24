const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  "id": {
    type: Number,
    index: true,
    unique: [true, "id should be unique."],
  },
  "title": String,
  "completedUsers": Number,
  "difficultyLevel": Number,
  "description": String,
  "param": mongoose.Schema.Types.Mixed,
  "tests": [{
    "code": String,
    "argument": mongoose.Schema.Types.Mixed,
    "solution": mongoose.Schema.Types.Mixed,
  }]
});

ProblemSchema.methods.checkCode = function (code) {
  const submittedFunction = new Function(`return ${code}`)();
  const results = [];
  let status = "success";

  for (const test of this.tests) {
    const actual = submittedFunction(test.argument) || "undefined";
    const expected = test.solution;
    const testResult = (actual === expected) ? "pass" : "fail";

    if (testResult === "fail") {
      status = "failure";
    }

    results.push({
      testResult,
      testCase: test.code,
      actual: JSON.stringify(actual),
      expected,
    });
  }

  return { status, results };
};

module.exports = mongoose.model('Problem', ProblemSchema);
