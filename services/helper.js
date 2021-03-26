function getCodeResult(test, result) {
  let userResult;

  if (result === undefined) {
    userResult = "undefined";
  } else if (result === null) {
    userResult = "null";
  } else {
    userResult = result;
  }

  return {
    expected: test.solution,
    output: userResult,
  };
}

exports.getCodeResult = getCodeResult;
