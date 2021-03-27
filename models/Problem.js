const mongoose = require("mongoose");
const { VM } = require("vm2");

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    index: true,
    unique: [true, "id should be unique."],
  },
  title: String,
  completedUsers: {
    type: Number,
    default: 0,
  },
  difficultyLevel: {
    type: Number,
    require: [true, "provide problem level."],
  },
  description: {
    type: String,
    require: [true, "provide problem description."],
  },
  param: mongoose.Schema.Types.Mixed,
  tests: [{
    code: String,
    solution: mongoose.Schema.Types.Mixed,
  }],
});

/**
 * check user submitted code
 * @param {string} code your code
 * @param {function} next callback function to error handling
 * @returns "pass" or "fail" status and each results
 */
ProblemSchema.methods.checkCode = function (code, next) {
  const vm = new VM({
    sandbox: { solution: null },
    timeout: 1000,
  });
  const results = [];
  let status = "success";

  vm.run(`solution = ${code}`);

  for (const test of this.tests) {
    const startedAt = Date.now();
    let actual = null;

    try {
      actual = vm.run(test.code) ?? "undefined";
    } catch (err) {
      actual = err.message;
    }

    const time = Date.now() - startedAt;
    const expected = test.solution;
    const testResult = (actual === expected) ? "Pass" : "Fail";

    if (testResult === "Fail") {
      status = "failure";
    }

    results.push({
      time,
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
};

module.exports = mongoose.model("Problem", ProblemSchema);
