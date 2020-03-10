const express = require('express');
const router = express.Router();



// const authCheck = (req, res, next) => {
//   if (!req.session.passport) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

router.get('/', (req, res, next) => {
  req.logOut();
  res.redirect('/login');
});


module.exports = router;
