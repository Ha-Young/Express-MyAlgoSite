const { ValidationError } = require("./error");

function changeType(value, type) {
  switch(type) {
    case "string": {
      return String(value);
    }
    case "number": {
      return Number(value);
    }
    case "boolean": {
      return value === "true" || value === "True";
    }
    case "object": {
      return JSON.parse(value);
    }
  }
}

async function validateProblemForm(req, res, next) {
  try {
    const form = req.body;
    const title = form.title;
    const description = form.description;
    const difficulty_level = Number(form.difficulty_level);
    const examples = [
      {
        code: form.example_code1,
        answer: changeType(form.example_answer1, form.example_answer1_type),
      },
      {
        code: form.example_code2,
        answer: changeType(form.example_answer2, form.example_answer2_type),
      }
    ];
    const tests = [
      {
        args: JSON.parse(form.test_arguments1),
        solution: changeType(form.test_result1, form.test_result1_type),
      },
      {
        args: JSON.parse(form.test_arguments2),
        solution: changeType(form.test_result2, form.test_result2_type),
      }
    ];

    req.body = {
      title,
      description,
      difficulty_level,
      examples,
      tests
    };

    next();
  } catch (err) {
    next(new ValidationError());
  }
}

module.exports = validateProblemForm;
