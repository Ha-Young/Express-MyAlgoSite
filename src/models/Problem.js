const joi = require("joi");
const mongoose = require("mongoose");
const joigoose = require("joigoose")(mongoose);

const testSchema = joi.object().keys({
  code: joi.string().required(),
  solution: joi.string().required(),
});

const joiProblemSchema = joi.object({
  id: joi.number().required(),
  title: joi.string().required(),
  completed_users: joi.number().required(),
  difficulty_level: joi.number().required(),
  description: joi.string(),
  tests: joi.array().items(testSchema).required(),
  img: joi.string(),
});

const ProblemSchema = new mongoose.Schema(joigoose.convert(joiProblemSchema));

module.exports = mongoose.model('Problem', ProblemSchema);
