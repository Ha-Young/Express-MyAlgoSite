const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

require('dotenv').config();

// req.session 객체에 어떤데이터를 저장할지.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 사용자 정보 조회 조회한 정보를 req.user에 저장
passport.deserializeUser((id, done) => {
  User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {
  // check if use already exists in our db
  User.findOne({googleId: profile.id}).then((currentUser) => {
    if(currentUser){
      done(null, currentUser);
    } else {
      new User({
        name: profile.displayName,
        googleId: profile.id,
        profilePictureUrl: profile.photos[0].value
      }).save().then(newUser => {
        done(null, newUser)
      });
    }
  });
}));
