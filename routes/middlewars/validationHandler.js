const createError = require("http-errors");

const {
  registerValidation,
  loginValidation,
} = require("../../util/validation");

exports.register = function (req, res, next) {
  const { error } = registerValidation(req.body);

  if (error) {
    const createdError = createError(400, error.message);
    return next(createdError);
  }

  next();
};

exports.login = function (req, res, next) {
  const { error } = loginValidation(req.body);

  if (error) {
    const createdError = createError(400, error.message);
    return next(createdError);
  }

  next();
};
