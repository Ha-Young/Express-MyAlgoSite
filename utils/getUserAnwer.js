function getUserAnwer(excuteStatement, solution) {
  console.log(solution);
  return new Function('solution', `return ${excuteStatement}`)(solution);
}

module.exports = getUserAnwer;
