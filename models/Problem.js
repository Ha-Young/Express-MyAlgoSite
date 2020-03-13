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
    required: true
  },
  completedUsers: {
    type: Number,
    default: 0
  },
  difficultyLevel: {
    type: Number,
    min: 1,
    max: 5,
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
