const mongoose = require('mongoose');
const { VM } = require('vm2');
const handleSchemaTypeError = require('../utils/handleSchemaTypeError');

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: handleSchemaTypeError('required', 'id', true)
  },
  title: {
    type: String,
    unique: true,
    required: handleSchemaTypeError('required', 'title', true)
  },
  completed_users: {
    type: Number,
    default: 0,
    min: handleSchemaTypeError('min', 'completed user', 0),
    validate: handleSchemaTypeError('validate', 'completed user'),
  },
  difficulty_level: {
    type: Number,
    default: 1,
    min: handleSchemaTypeError('min', 'difficulty level', 1),
    max: handleSchemaTypeError('max', 'difficulty level', 8),
    required: handleSchemaTypeError('required', 'difficulty level', true),
    validate: handleSchemaTypeError('validate', 'difficulty level'),
  },
  description: {
    type: String,
    required: handleSchemaTypeError('required', 'description', true)
  },
  tests: [
    {
      code: String,
      solution: {}
    }
  ]
});

ProblemSchema.statics.validateSolution = async function (id, solutionString) {
  const results = [];
  const problem = await Problem.findOne({ id }).lean();
  const vm = new VM({
    timeout: 1000,
    sandbox: {}
  });

  try {
    problem.tests.forEach(test => {
      const userSolution = vm.run(solutionString + test.code);
      let status = 'success';

      if (userSolution !== test.solution) {
        status = 'failed';
      }

      results.push({
        status,
        code: solutionString.trim(),
        solution: userSolution
      });
    });

    return results;
  } catch (err) {
    results.push({
      status: 'failed',
      code: solutionString.trim(),
      solution: err.message
    });

    return results;
  }
}

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;
