const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */

const ProblemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: [true, 'A problem must have a title field'],
      unique: true,
    },
    completed_users: {
      type: Number,
      min: [0, 'The number of completed users can not be lower than 0'],
    },
    difficulty_level: {
      type: Number,
      required: [true, 'A problem must have a difficulty_level field'],
      validate: {
        validator: function (val) {
          return val > 0;
        },
        message: 'The difficult_level should be higher than 0',
      },
    },
    description: {
      type: String,
    },
    solution_count: Number,
    tests: [
      {
        code: String,
        solution: String,
      },
    ],
    secretProblem: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProblemSchema.virtual('level').get(function () {
  console.log('virture');
  if (this.difficulty_level === 1) return 'Easy';
  else if (this.difficulty_level === 2) return 'Normal';
  else if (this.difficulty_level === 3) return 'Hard';
});

ProblemSchema.pre(/^find/, function (next) {
  this.find({ secretProblem: { $ne: true } });
  next();
});

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;
