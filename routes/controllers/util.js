const vm = require('vm');
const User = require('../../models/User');
const Problem = require('../../models/Problem');

exports.getUserinfo = (userInfo) => {
  const result = {
    name: userInfo.name,
    imageUrl: userInfo.imageUrl,
    githubUrl: userInfo.githubUrl,
    solvedLevelOne: 0,
    solvedLevelTwo: 0,
    solvedLevelThree: 0,
  };

  userInfo.solved.forEach((problem) => {
    if (problem.difficultyLevel === 1) {
      result.solvedLevelOne++;
    } else if (problem.difficultyLevel === 2) {
      result.solvedLevelTwo++;
    } else if (problem.difficultyLevel === 3) {
      result.solvedLevelThree++;
    }
  });

  return result;
}

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

exports.updateUserRecords = async (userId, problemId) => {
  const loginedUser = { _id: userId };
  const user = await User.findById(loginedUser);
  user.solved.push(problemId);
  await user.save();
}

exports.updateProblemRecords = async (problemId, beforeRecords) => {
  const updatedCompletedUsers = beforeRecords + 1;
  const solvedProblem = { _id: problemId };
  const updateRecordes = { completedUsers: updatedCompletedUsers };
  const options = { new: true };
  await Problem.findOneAndUpdate(solvedProblem, updateRecordes, options);
}
