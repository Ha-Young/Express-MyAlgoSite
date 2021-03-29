const joi = require("joi");
const mongoose = require("mongoose");
const joigoose = require("joigoose")(mongoose);

const testSchema = joi.object().keys({
  code: joi.string().required(),
  solution: joi.any().required(),
});

const joiProblemSchema = joi.object({
  title: joi.string().required(),
  completed_users: joi.number().required(),
  difficulty_level: joi.number().required(),
  description: joi.string(),
  tests: joi.array().items(testSchema).required(),
  argument: joi.string(),
  img: joi.string(),
  result_type: joi.string().required(),
});

const ProblemSchema = new mongoose.Schema(joigoose.convert(joiProblemSchema));

module.exports = mongoose.model('Problem', ProblemSchema);
