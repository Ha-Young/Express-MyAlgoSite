const mongoose = require('mongoose');
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

module.exports = mongoose.model('Problem', ProblemSchema);
