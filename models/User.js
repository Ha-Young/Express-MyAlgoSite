const mongoose = require('mongoose');

mongoose.connect(process.env.DB_ADDRESS, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  githubId: String,
  name: String,
  solvedProblems: [
    {
      id: String,
      solution: String
    }
  ],
  incompleteProblems: [
    {
      id: String,
      solution: String
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
