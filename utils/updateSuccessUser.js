const PROBLEM_RESULT = require("../constants/problemConstants");

async function updateSuccessUser(problem, currentUserId) {
  const checkSuccessUser = problem.completed_list.some(userId => {
    return userId === currentUserId;
  });

  if (!checkSuccessUser) {
    problem.completed_users += PROBLEM_RESULT.INCREASE_VALUE;
    problem.completed_list.push(currentUserId);

    await problem.save();
  }
}

module.exports = updateSuccessUser;
