const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
  id: { type: String, unique: true, required: true, trim: true },
  password: { type: String, trim: true },
  provider: { type: String, required: true, default: 'codewars' },
  solved_problem: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model('User', UserSchema);
