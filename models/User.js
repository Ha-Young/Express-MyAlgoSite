const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  google_id: {
    type: String,
    required: [true, "google_id is required"],
    index: true,
  },
  user_name: String,
  email: String,
  problems: {
    type: Object,
    succeed_problems: [{
      type: mongoose.ObjectId,
      required: [true, "Problem's ObjectId for succeed_problems is required"],
    }],
    solving_problems: [{
      type: Object,
      problem_id: {
        type: mongoose.ObjectId,
        required: [true, "Problem's ObjectId for solving_problems is required"],
      },
      user_code: String,
    }]
  },
}, { createdAt: "create_at", updatedAt: "updated_at" });

module.exports = mongoose.model("User", UserSchema);
