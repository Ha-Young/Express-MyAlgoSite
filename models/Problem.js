const createError = require("http-errors");
const mongoose = require('mongoose');
const { VM } = require("vm2");

const ProblemSchema = new mongoose.Schema({
  "id": {
    type: Number,
    index: true,
    unique: [true, "id should be unique."],
  },
  "title": String,
  "completedUsers": {
    type: Number,
    default: 0,
  },
  "difficultyLevel": {
    type: Number,
    require: [true, "provide problem level."],
  },
  "description": {
    type: String,
    require: [true, "provide problem description."],
  },
  "param": mongoose.Schema.Types.Mixed,
  "tests": [{
    "code": String,
    "solution": mongoose.Schema.Types.Mixed,
  }]
});

ProblemSchema.methods.checkCode = function (code, next) {
  try {
    const vm = new VM({ sandbox: { solution: null }});
    const results = [];
    let status = "success";

    vm.run(`solution = ${code}`);

    for (const test of this.tests) {
      const actual = vm.run(test.code) ?? "undefined";
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

    if (status === "success") {
      this.completedUsers++;
    }

    return { status, results };
  } catch (err) {
    next(createError(400, "solution code is wrong."))
  }
};

module.exports = mongoose.model('Problem', ProblemSchema);
