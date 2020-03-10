const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: 'ea0bf89577cd50fcd386',
      clientSecret: '9df8db22c33eb5c4f8a29db533ef694a8fef3caf',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const {
        _json: { id, avatar_url: avatarUrl, name, email }
      } = profile;

      if (!email) {
        const error = new Error('이메일이 비공개로 설정되어있습니다. 로그인 및 가입을 위해 다시 한 번 확인해주세요.');
        return done(error);
      }

      try {
        const user = await User.findOne({ email });

        if (user) {
          return done(null, user);
        } else {
          const user = await User.create({
            name,
            githubId: id,
            email,
            avatarUrl
          });
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
