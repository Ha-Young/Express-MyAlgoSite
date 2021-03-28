const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const problemSchema = new mongoose.Schema({
  id: {
    type: Number,
    index: true
  },
  title: String,
  completed_users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  difficulty_level: {
    type: Number,
    enum: [1, 2, 3, 4, 5], // 1, 2, 3, 4, 5만 넣을 수 있음
  },
  description: String,
  tests: [{
    code: String,
    solution: mongoose.SchemaTypes.Mixed
  }]
}, {timestamps: true});

module.exports = mongoose.model('Problem', problemSchema);
