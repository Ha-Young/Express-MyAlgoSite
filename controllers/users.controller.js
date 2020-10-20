const User = require('../models/User');

exports.saveUser = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const id = profile.id;
  const email = profile.emails[0].value;
  const photo = profile.photos[0].value;
  const provider = profile.provider;

  User.save({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}



// const id = profile.id;
// const email = profile.emails[0].value;
// const photo = profile.photos[0].value;
// const provider = profile.provider;

// const user = {
//   profile: {
//     id,
//     email,
//     photo,
//     provider
//   }
// };
// console.log(user);
// await new User(user).save();
// done(user);