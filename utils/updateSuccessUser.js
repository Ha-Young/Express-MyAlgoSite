const PROBLEM = require("../constants/problemConstants");

async function updateSuccessUser(problem, currentUserId) {
  const successList = problem.completed_list;
  let problemSucessCount = problem.completed_users;

  const isSuccessUser = successList.some(userId => {
    return userId === currentUserId;
  });

  if (!isSuccessUser) {
    problemSucessCount += PROBLEM.INCREASE_VALUE;
    successList.push(currentUserId);

    await problem.save();
  }
}

module.exports = updateSuccessUser;
