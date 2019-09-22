const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  user_id: { // user_id가 필요한 이유..
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  profile_img_url: {
    type: String
  },
  solved_problems: [{
    problem_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem'
    },
    written_code: String,
    updated_at: Date
  }]
}, { timestamps: { createdAt: 'created_at' }
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
