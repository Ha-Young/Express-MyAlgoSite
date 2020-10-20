const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

router.post('/sign-up', (req, res, next) => {
  req.body.name;
});

module.exports = router;
