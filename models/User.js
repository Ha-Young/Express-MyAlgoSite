const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
  email: String,
  completed_problems: [String]
});

userSchema.statics.findOrCreate = async function findOrCreate (pdata, cb) {
  const data =  await this.findOne({ googleId: pdata.profile.id, });
  if (!data) {
    const newData = {
      "googleId": pdata.profile.id,
      "username": pdata.profile.displayName,
      "email": pdata.profile.emails[0].value
    }
    await this(newData).save();
  }

  cb(null, data);
}

module.exports = mongoose.model('User', userSchema);
