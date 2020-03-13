const { VM, VMScript } = require('vm2');

const SUCCESS_MESSAGE = '성공! 모든 테스트를 통과했습니다. 최고에요! 👍🏻';
const FAILURE_MESSAGE = '실패! 괜찮아요, 다시 시도해볼까요? 💪🏻';
const PASS = 'PASS';
const FAIL = 'FAIL';

module.exports = runTest = (userInput, testList) => {
  const vm = new VM();
  const testLog = [];
  let testResult = SUCCESS_MESSAGE;

  try {
    for (const test of testList) {
      const { code, expected } = test;
      const userFunction = new VMScript(`${userInput}${code}`);
      const userFunctionResult = vm.run(userFunction);

      if (JSON.stringify(expected) !== JSON.stringify(userFunctionResult)) {
        testResult = FAILURE_MESSAGE;
        testLog.push([ FAIL, expected, userFunctionResult ]);
      } else {
        testLog.push([ PASS, expected, userFunctionResult ]);
      }
    }
  } catch(err) {
    const firstExpectedValue = testList[0].expected;
    const errMessage = `${err.constructor.name}: ${err.message}`;

    testResult = FAILURE_MESSAGE;
    testLog.push([ FAIL, firstExpectedValue, errMessage ]);
  }

  return [ testResult, testLog ];
};
