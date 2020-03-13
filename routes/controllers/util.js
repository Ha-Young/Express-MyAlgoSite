const vm = require('vm');
const User = require('../../models/User');
const Problem = require('../../models/Problem');

exports.excuteCode = (tests, inputedSolution) => {
  const results = [];
  tests.forEach(test => {
    const code = `
      ${inputedSolution}
      ${test.code}
    `
    const script = new vm.Script(code);
    const { solution } = test;
    const result = script.runInNewContext(undefined, { timeout: 7000 });
    results.push([solution, result]);
  });
  return results;
}

exports.updateUserRecords = async (userId, solvedLevel, totalCount, lvOneCount, lvTwoCount, lvThreeCount) => {
  let user = null;
  const solvedAllCount = totalCount + 1;
  const solvedLevelOne =  lvOneCount + 1;
  const solvedLevelTwo = lvTwoCount + 1;
  const solvedLevelThree = lvThreeCount + 1;
  if (solvedLevel === 1) {
    user = await User.findOneAndUpdate({ _id: userId }, { solvedAllCount, solvedLevelOne });
  } else if (solvedLevel === 2) {
    user = await User.findOneAndUpdate({ _id: userId }, { solvedAllCount, solvedLevelTwo });
  } else {
    user = await User.findOneAndUpdate({ _id: userId }, { solvedAllCount, solvedLevelThree });
  }
  return user;
}

exports.updateProblemRecords = async (problemId, beforeRecords) => {
  const updatedCompletedUsers = beforeRecords + 1;
  await Problem.findOneAndUpdate({ _id: problemId }, { completedUsers: updatedCompletedUsers });
}
