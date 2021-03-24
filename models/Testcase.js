const mongoose = require('mongoose');

const TestcaseSchema = new mongoose.Schema({ // 테케 아이디를 안가져도 되는가?
  _id: false,
  code: {
    type: String,
    required: true,
  },
  solution: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Testcase', TestcaseSchema);
