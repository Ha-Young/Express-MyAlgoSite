const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.render('index', { title: '바닐라코딩' });
  } else {
    res.status(301).redirect('/login');
  }
});

module.exports = router;
