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
  const solvedAllCount = totalCount + 1;
  const loginedUser = { _id: userId };
  const updateRecords = { solvedAllCount };
  const options = { new: true };
  if (solvedLevel === 1) {
    updateRecords.solvedLevelOne = lvOneCount + 1;
  } else if (solvedLevel === 2) {
    updateRecords.solvedLevelTwo = lvTwoCount + 1;
  } else if (solvedLevel === 3) {
    updateRecords.solvedLevelThree = lvThreeCount + 1;
  }
  const user = await User.findOneAndUpdate(loginedUser, updateRecords, options);
  return user;
}

exports.updateProblemRecords = async (problemId, beforeRecords) => {
  const updatedCompletedUsers = beforeRecords + 1;
  const solvedProblem = { _id: problemId };
  const updateRecordes = { completedUsers: updatedCompletedUsers };
  const options = { new: true };
  await Problem.findOneAndUpdate(solvedProblem, updateRecordes, options);
}
