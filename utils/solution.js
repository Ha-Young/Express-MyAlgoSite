/**
 *
 * @param {string} fn - Function execution statement as a string named solution
 * @returns - arguments of executed fn
 */
exports.getArgument = (fn) => {
  return new Function(`const solution = (...args) => args; return ${fn}`)();
};
