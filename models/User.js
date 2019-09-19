const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*

  TODO: Fill in the model specification

 */
const userSchema = new Schema(
  {
    id : {
      type : Number,
      required : true,
      unique : true
    },
    username: {
      type: String,
      required: true,
    },
    collect_problem : [],
    profileUrl : String,
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
