const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  "ID": {
    type: Number
  },
  "Name": {
    type: String
  },
  "Image URL": {
    type: String
  },
  "Email": {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);