const vm = require("vm");

function checkSolution(tests, solution) { // typecheck, 수정도 해야함..
  const log = [];
  let error;

  tests.forEach((test) => {
    try {
      const script = solution + test.code;
      const usingScript = vm.runInNewContext(script);

      if (usingScript === test.solution) {
        log.push({
          result: "SUCCESS",
          case: test.code,
          answer: usingScript,
        });
      } else {
        log.push({
          result: "FAILURE",
          case: test.code,
          answer: test.solution,
          wrongAnswer: usingScript,
        });
      }
    } catch (err) {
      error = err;
    }
  });

  const isPassed = log.every((data) => "SUCCESS" === data.result);

  return { isPassed, log, error };
}

exports.checkSolution = checkSolution;
