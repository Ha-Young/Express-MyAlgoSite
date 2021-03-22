const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('pages/index');
});

router.get('/login', (req, res, next) => {
  res.render('pages/login');
});

module.exports = router;
