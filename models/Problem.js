const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProblemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  completedUsers: [{ type: Schema.Types.ObjectID, ref: "User" }],
  difficultyLevel: { type: Number, enum: [1, 2, 3, 4, 5] },
  description: { type: String },
  tests: [
    {
      code: { type: String },
      solution: { type: String },
    },
  ],
});

ProblemSchema.methods.addCompletedUser = async function (id) {
  if (this.completedUsers.find(userId => userId.toString() === id.toString())) {
    return;
  }
  
  this.completedUsers.push(id);
  await this.save();
}

module.exports = mongoose.model("Problem", ProblemSchema);
