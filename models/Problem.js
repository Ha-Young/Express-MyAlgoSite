const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: {type: String, required: true},
  completed_users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  difficulty_level: { type: Number, required: true },
  description: { type: String, required: true },
  tests: [{ 
    code: { type: String,required: true },
    solution: { type: mongoose.Schema.Types.Mixed, required: true }
  }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
