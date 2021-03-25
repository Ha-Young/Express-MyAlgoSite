const _ = require("lodash");

/**
 *
 * @param {String} fn - Function execution statement as a string named solution
 * @returns - Arguments of executed fn
 */
exports.getArgument = (fn) => {
  return new Function(`const solution = (...args) => args; return ${fn}`)();
};

/**
 *
 * @param {Array} argList List of problem arguments
 * @param {Function} userSolution Problem solution of user
 * @returns If an error occurs, return an error else return userAnswerList
 */
exports.getUserAnwerList = (argList, userSolution) => {
  const result = [];

  for (const arg of argList) {
    try {
      result.push(userSolution(arg));
    } catch (err) {
      throw new Error(err);
    }
  }

  return result;
};

/**
 *
 * @param {Array} problemAnswer - Expected answers
 * @param {Array} userAnswer - Answers from user
 * @returns - Object with each expected awnswer, user answer, and result
 */
exports.getResultList = (problemAnswer, userAnswer) => {
  const problemAnswerCopy = _.cloneDeep(problemAnswer);
  const userAnswerCopy = _.cloneDeep(userAnswer);
  const resultList = [];

  for (let i = 0; i < problemAnswerCopy.length; i++) {
    const result = {
      expected: JSON.stringify(problemAnswerCopy[i]),
      got: JSON.stringify(userAnswerCopy[i]),
    };

    if (_.isEqual(problemAnswerCopy[i], userAnswerCopy[i])) {
      result.output = true;
    } else {
      result.output = false;
    }

    if (result.got === undefined) {
      result.got = '"undefined"';
    }

    resultList.push(result);
  }

  return resultList;
};
