const express = require('express');
const router = express.Router();

const athenticate = require('../middleware/athenticate');

router.get('/', athenticate(), (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

module.exports = router;
