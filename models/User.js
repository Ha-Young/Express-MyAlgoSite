const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    index: true
  },
  name: {
    familyName: String,
    givenName: String
  },
  photos: [{}],
  locale: String,
  publishedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);

// {
//   id: '101185523165310471331',
//   displayName: 'div-div-span helloworld',
//   name: { familyName: 'helloworld', givenName: 'div-div-span' },
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a-/AOh14GhkbeMzISGvUBRiZ3HmJA1mTg78SUBua1u_NuIC=s96-c'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "101185523165310471331",\n' +
//     '  "name": "div-div-span helloworld",\n' +
//     '  "given_name": "div-div-span",\n' +
//     '  "family_name": "helloworld",\n' +
//     '  "picture": "https://lh3.googleusercontent.com/a-/AOh14GhkbeMzISGvUBRiZ3HmJA1mTg78SUBua1u_NuIC\\u003ds96-c",\n' +
//     '  "locale": "ko"\n' +
//     '}',
//   _json: {
//     sub: '101185523165310471331',
//     name: 'div-div-span helloworld',
//     given_name: 'div-div-span',
//     family_name: 'helloworld',
//     picture: 'https://lh3.googleusercontent.com/a-/AOh14GhkbeMzISGvUBRiZ3HmJA1mTg78SUBua1u_NuIC=s96-c',
//     locale: 'ko'
//   }
// }