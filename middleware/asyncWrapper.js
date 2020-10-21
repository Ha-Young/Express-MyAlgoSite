const { MongoError } = require("../service/error");

function asyncWrapper(asyncFn) {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (err) {
      const type = err.errors.description.properties.type;

      if (type === "required" || type === "unique") {
        return next(new MongoError(err.message, 400));
      }

      return next(new MongoError(err.message));
    }
  });
}

module.exports = asyncWrapper;
