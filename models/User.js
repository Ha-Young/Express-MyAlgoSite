const mongoose = require("mongoose");

const { ObjectId } = mongoose.SchemaTypes;
const SolvedSchema = new mongoose.Schema({
  problemId: {
    type: ObjectId,
    ref: "Problem",
  },
  code: {
    type: String,
  },
  isSolved: {
    type: Boolean,
    default: false,
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  solved: [ SolvedSchema ],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
