const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  sub: String,
  name: String,
  given_name: String,
  family_name: String,
  picture: String,
  email: String,
  email_verified: Boolean,
  locale: String
});

module.exports = mongoose.model('User', UserSchema);

// {
//   id: '114829010064936107236',
//   displayName: '김희찬',
//   name: { familyName: '김', givenName: '희찬' },
//   emails: [ { value: 'ways2kim@gmail.com', verified: true } ],
//   photos: [
//     {
//       value: 'https://lh5.googleusercontent.com/-D55tV74Jt8w/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckHwS28VZMXx9tcY0XOg2N0yjP0Dw/s96-c/photo.jpg'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "114829010064936107236",\n' +
//     '  "name": "김희찬",\n' +
//     '  "given_name": "희찬",\n' +
//     '  "family_name": "김",\n' +
//     '  "picture": "https://lh5.googleusercontent.com/-D55tV74Jt8w/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckHwS28VZMXx9tcY0XOg2N0yjP0Dw/s96-c/photo.jpg",\n' +
//     '  "email": "ways2kim@gmail.com",\n' +
//     '  "email_verified": true,\n' +
//     '  "locale": "ko"\n' +
//     '}',
//   _json: {
//     sub: '114829010064936107236',
//     name: '김희찬',
//     given_name: '희찬',
//     family_name: '김',
//     picture: 'https://lh5.googleusercontent.com/-D55tV74Jt8w/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckHwS28VZMXx9tcY0XOg2N0yjP0Dw/s96-c/photo.jpg',
//     email: 'ways2kim@gmail.com',
//     email_verified: true,
//     locale: 'ko'
//   }
// }
