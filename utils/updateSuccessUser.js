async function updateSuccessUser(problem, currentUserId) {
  const successList = problem.completed_list;

  const isSuccessUser = successList.some(userId => {
    return userId === currentUserId;
  });

  if (!isSuccessUser) {
    successList.push(currentUserId);

    await problem.save();
  }
}

module.exports = updateSuccessUser;
