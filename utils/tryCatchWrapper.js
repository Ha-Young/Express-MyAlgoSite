function tryCatchWrapper(fn) {
  return async function(req, res, next) {
    try {
      return await fn(req, res, next);
    } catch {
      next;
    }
  };
}

module.exports = tryCatchWrapper;
