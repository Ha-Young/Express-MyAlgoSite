const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id : {
    type : Number,
    unique: true
  },
  title : {
    type : String
  },
  difficulty_level : {
    type : Number
  },
  description : {
    type : String
  },
  completed_users : {
    type : Number
  },
  limit : [],
  tests : [{
    param : {
      type : String,
    },
    solution : {
      type : mongoose.Schema.Types.Mixed,
      require : true
    }
  }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
