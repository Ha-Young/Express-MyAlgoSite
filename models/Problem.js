const mongoose = require('mongoose');

const handleSchemaTypeError = require('../utils/handleSchemaTypeError');

//질문: 여기서 error handling 어떻게 하는가
// 만약 handleSchemaTypeError에서 에러가 터지면 throw할건데 이거 받아 넘겨야한다.
// 에러넘겨주기가 가능하긴한데 그러면 schemaObject 만들때 첫번째로 넘겨주고
// model에서 또 넘겨주고해야 next 통해서 global error handler까지 도착할 수 있다. (예상대로라면)
// 쓸데없는 코드가 너무 늘어나는 느낌인데... 꼭 해야하나? 질문해야댐
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
