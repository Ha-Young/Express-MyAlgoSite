class AsyncError extends Error {
  constructor() {
    super();
  }
}

function asyncWrapper(asyncFn) {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(AsyncError);
    }
  });
}

module.exports = asyncWrapper;
