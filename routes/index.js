const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    res.render('index', { title: '바닐라코딩' });
  }
});

module.exports = router;
