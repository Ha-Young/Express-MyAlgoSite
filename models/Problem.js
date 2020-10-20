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
    require: true,
  },
});

const Problem = mongoose.model('Problem', ProblemSchema);

const testProblem = new Problem({
  id: 3,
  title: 'hello',
});

console.log(testProblem, 'tp');

testProblem
  .save()
  .then((doc) => {
    console.log('save done');
    console.log(doc);
  })
  .catch(console.log);

module.exports = Problem;
