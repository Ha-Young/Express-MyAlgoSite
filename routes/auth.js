const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login',
  (req, res, next) => {
    console.log(req.user);
    console.log(req.body);
    res.send('login!!');
  }
);

module.exports = router;
