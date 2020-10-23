const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/User');

module.exports = () => {
  const GithubStrategy = require('passport-github').Strategy;

  passport.use(
    new GithubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/login/github/callback"
    }, async function (accessToken, refreshToken, profile, cb) {
      console.log('이거 왜 실행 안되냐..');
      console.log(profile);

      try {
        // find or create user
        const user = await User.find({ id: profile.id });

        console.log(user);

        // 못찾은 경우
        if (user.length === 0) {
          console.log('못찾아서 등록하려구..')
          // create user
          const { id, username, profileUrl } = profile;

          const user = new User({
            id,
            username,
            profileUrl
          });

          await user.save();

          return cb(null, user);
        } else {
          console.log('DB에서 유저 찾았다!');
          console.log('패스포트 인증 완료..!');

          return cb(null, user);
        }
      } catch (err) {
        console.log('패스포트 인증 중 에러..');
        console.error(err);
        return cb(err, null);
      }
    })
  );
};

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
