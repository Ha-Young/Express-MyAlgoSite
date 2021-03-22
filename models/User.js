const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
  email: String,
});

userSchema.statics.findOrCreate = async function findOrCreate (pdata, cb) {
  const data =  await this.findOne({ googleId: pdata.profile.id, });
  
  if (!data) {
    const data = {
      "googleId": pdata.profile.id,
      "username": pdata.profile.displayName,
      "email": pdata.profile.emails[0].value,
    }
    const saved = await this(data).save(cb);
  } else {
    cb();
  }

}

module.exports = mongoose.model('User', userSchema);
