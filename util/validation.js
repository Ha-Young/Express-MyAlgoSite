const Joi = require("joi");

exports.register = function (req, res, next) {
  const { error } = registerValidation(req.body);

  if (error) {
    return next(`${error.details[0].message}`);
  }

  next();
};

const registerValidation = (requestedBody) => {
  //camelcase 처리
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(requestedBody);
};

const loginValidation = (requestedBody) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(requestedBody);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
