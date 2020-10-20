const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.passport) {
    return res.render('index', { title: 'codewars' });
  }

  res.redirect('/login');
  // console.log('session', req.session.passport);
});

module.exports = router;
