const findUserSolution = (solutions, problemId) => {
  const solution = solutions.find(
    (solution) => solution.problemId === parseInt(problemId, 10),
  );

  if (!solution) return null;

  return solution.solutionFunction;
};

module.exports = findUserSolution;
