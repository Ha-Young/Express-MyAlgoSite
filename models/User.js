const mongoose = require('mongoose');

mongoose.connect(process.env.DB_ADDRESS, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const userSchema = new mongoose.Schema({
  githubId: String,
  name: String
});

module.exports = mongoose.model('User', userSchema);
