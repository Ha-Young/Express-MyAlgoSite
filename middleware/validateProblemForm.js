const { ValidationError } = require("../service/error");

function changeType({ code, answer, answer_type }, next) {
  const result = {
    code,
    answer,
    answer_type,
  };

  switch (answer_type) {
    case "string": {
      result.answer = String(answer);

      return result;
    }
    case "number": {
      result.answer = Number(answer);

      return result;
    }
    case "boolean": {
      if (!(answer !== "true" || answer !== "True" || answer !== "false" || answer !== "False")) {
        next(new ValidationError(`${answer} is not boolean. ex) true, false`));
      }
      result.answer = answer === "true" || answer === "True";

      return result;
    }
    case "object": {
      result.answer = JSON.parse(answer);

      return result;
    }
  }
}

function checkExample({ code, answer }, next) {
  if (!code.length) next(new ValidationError("can not found code"));
  if (!answer.length) next(new ValidationError("can not found answer"));
  if (!code.includes("solution")) next(new ValidationError("functionName must be solution, ex) solution(2)"));
}

async function validateProblemForm(req, res, next) {
  const { title, description, difficulty_level, examples, tests } = req.body;

  if (!title.length) next(new ValidationError("can not found title"));
  if (!description.length) next(new ValidationError("can not found description"));

  examples.forEach(example => checkExample(example, next));
  tests.forEach(test => checkExample(test, next));

  const changedExamples = examples.map(example => changeType(example, next));
  const changedTests = tests.map(test => changeType(test, next));

  req.body.difficulty_level = Number(difficulty_level);
  req.body.examples = changedExamples;
  req.body.tests = changedTests;

  next();
}

module.exports = validateProblemForm;
