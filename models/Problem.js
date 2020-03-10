import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const testSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  solution: {
    type: Schema.Types.Mixed,
    required: true
  }
});

const ProblemSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  completedUsers: {
    type: Number,
    required: true
  },
  difficultyLevel: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  initialCode: {
    type: String,
    required: true
  },
  tests: {
    type: [testSchema],
    required: true
  }
}, {
  timestamps: true
});

export default model('Problem', ProblemSchema);
