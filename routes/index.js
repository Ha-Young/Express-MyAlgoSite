const express = require('express');
const router = express.Router();
// const CodeMirror = require('codemirror');
// let cm = new CodeMirror.fromTextArea(document.findElementById("editor"), { lineNumbers: true });


// const authCheck = (req, res, next) => {
//   if (!req.session.passport) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// }

router.get('/', (req, res, next) => {
  if (!req.session.passport) {
    res.render('login', { hasLoggedIn: false })
  } else {
    res.render('index', { hasLoggedIn: true });
  }
  // res.render('index');
});

module.exports = router;

