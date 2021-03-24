const getProblem = (problems, problemId) => {
  const problemIdx = problems.findIndex((item) => {
    return item.id.toString() === problemId;
  });

  return problems[problemIdx];
};

module.exports = getProblem;
