const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

module.exports = router;
