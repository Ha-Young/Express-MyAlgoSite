const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */

const ProblemSchema = new mongoose.Schema({
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
    min: [1, 'The level 1 is the lowest level'],
  },
  description: {
    type: String,
  },
  solution_count: Number,
  test: [
    {
      code: String,
    },
  ],
});
const Problem = mongoose.model('Problem', ProblemSchema);

// const testProblem = new Problem({
//   id: 123,
// });
// console.log(testProblem);
// const save = async () => {
//   try {
//     const result = await testProblem.save();
//     console.log(result, 'succ');
//   } catch (err) {
//     console.log(err, 'fail');
//   }
// };
// save();

module.exports = Problem;
