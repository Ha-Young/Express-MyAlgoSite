const { VM } = require("vm2");
const deepEqual = require("fast-deep-equal");

exports.getResultOfCode = (tests, code) => {
  const vm = new VM({
    console: "inherit",
    compiler: "javascript",
    timeout: 5000,
    require: { external: false }
  });
  let failureCount = 0;

  try {
    const resultList = [];
    const answerList = [];

    for (const test of tests) {
      const testCode = code + test.code;
      const result = vm.run(testCode);
      const compareResult = deepEqual(result, test.solution);

      if (compareResult) {
        resultList.push("success");
      } else {
        failureCount++;
        resultList.push("failure");
      }

      answerList.push(result);
    }

    return { resultList, answerList, failureCount };
  } catch (err) {
    return { err };
  }
};
