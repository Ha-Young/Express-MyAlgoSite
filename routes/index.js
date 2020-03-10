const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if(req.isAuthenticated()){
    console.log('인증되어서 실행됨/인덱스라우터', req.isAuthenticated());
    res.render('index', { title: '바닐라코딩' });
  } else {
    console.log('인증되지않았기때문에 실행됨');
    res.status(301).redirect('/login');
  }
});

module.exports = router;
