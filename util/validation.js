const Joi = require("joi");

const registerValidation = (requestedBody) => {
  //애초에 이름 바꿔야됨 validateRegister 이렇게
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
