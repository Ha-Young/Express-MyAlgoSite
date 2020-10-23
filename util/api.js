const vm = require('vm');
const {
  TEST_FAIL,
  TEST_SUCCESS,
  ERR_SCRIPT_EXECUTION_TIMEOUT,
  RUNTIME_ERROR
} = require('../constant/constants');

exports.runCode = (codeString, tests) => {
  const testResults = [];
  const context = { solution: null };
  vm.createContext(context);
  vm.runInContext(`solution = ${codeString};`, context);

  tests.forEach(test => {
    try {
      const result = vm.runInContext(test.code, context, { timeout: 1000 });

      if (result === test.solution) {
        testResults.push({
          test: test.code,
          result: TEST_SUCCESS,
          message: TEST_SUCCESS,
        });
      } else {
        testResults.push({
          test: test.code,
          result: TEST_FAIL,
          message: TEST_FAIL,
        });
      }
    } catch (error) {
      if (error.code === ERR_SCRIPT_EXECUTION_TIMEOUT) {
        testResults.push({
          test: test.code,
          result: TEST_FAIL,
          message: ERR_SCRIPT_EXECUTION_TIMEOUT,
        });
      } else {
        testResults.push({
          test: test.code,
          result: TEST_FAIL,
          message: RUNTIME_ERROR,
        });
      }
    }
  });

  return testResults;
};
