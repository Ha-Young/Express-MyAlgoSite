const vm = require('vm');

class SolutionResult {
  constructor(userResult, correctResult, error) {
    if (userResult === undefined) {
      this.userResult = 'undefined';
    } else if (userResult === null) {
      this.userResult = 'null';
    } else {
      this.userResult = userResult;
    }

    this.correctResult = correctResult;
    this.error = error;
    this.isCorrect = this.compare();
  }

  compare() {
    return this.userResult === this.correctResult;
  }
}

function getResultLog(code, tests = []) {
  const log = [];

  for (const test of tests) {
    const { code: executionCommand, solution: correctResult } = test;

    try {
      const script = new vm.Script(code + executionCommand);
      const userResult = script.runInNewContext({}, { timeout: 1000 });
      log.push(new SolutionResult(userResult, correctResult));
    } catch (error) {
      const { name, message } = error;
      log.push(new SolutionResult(null, correctResult, `${name}: ${message}`));
    }
  }

  return log;
}

module.exports = getResultLog;
