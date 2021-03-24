const AppError = require("./appError");

/**
 * Used to reduce depth of async function by removing try-catch block
 * @param {Function} fn - async function
 * @return {Function} to catch parameter function's error
 */
module.exports = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
};
