const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  userName: String,
  pwd: String,
  displayName :String,
  problem : [
    {
      id : Number,
      title : String,
      completed : Boolean
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
