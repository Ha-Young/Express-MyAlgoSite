const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect('mongodb://localhost:27017/codewars', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongoose is on');
  });

// const problemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'must have a name'],
//   },
//   rating: Number,
//   price: Number,
// });

// const Problem = mongoose.model('Problem', problemSchema);

// const testProblem = new Problem({
//   name: 'hi',
//   rating: 5,
//   price: 3,
// });

// testProblem.save().then((doc) => {
//   console.log('save success');
//   console.log(doc);
// });

// console.log(testProblem);

const server = app.listen(process.env.PORT, () => {
  console.log('main server is on');
});
