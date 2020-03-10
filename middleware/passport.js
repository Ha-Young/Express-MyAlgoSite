const Strategy = require('passport-github').Strategy;
const User = require('../models/User');

module.exports = function passport(passport){
  passport.use(new Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/login/github/callback'
  },
  async function(accessToken, refreshToken, profile, cb) {
    const userInfo = {
      userId: profile.id,
      userName: profile.username,
      userPhotoUrl: profile.photos[0].value
    }
    //기존에 있는지 확인해서 있으면 그냥 실행하고, 아니면 새로 디비에 저장해줄것
    try {
      const checkedUser = await User.findOne({ userId: profile.id});
      if(checkedUser){
        cb(null, userInfo);
      } else {
        const newUser = await new User(userInfo).save();
        cb(null, newUser);
      }
    } catch (err) {
      cb(error);
    }
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
}
