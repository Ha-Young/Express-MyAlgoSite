const {
  registerValidation,
  loginValidation,
} = require("../../util/validation");

exports.register = function (req, res, next) {
  const { error } = registerValidation(req.body);

  if (error) {
    return next(`${error.details[0].message}`);
  }

  next();
};

exports.login = function (req, res, next) {
  const { error } = loginValidation(req.body);

  if (error) {
    return next(`${error.details[0].message}`);
  }

  next();
};
