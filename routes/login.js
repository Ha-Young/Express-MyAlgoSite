const express = require('express');
const router = express.Router();
// const passport = require('passport');

router.get('/', (req, res, next) => {
  res.status(200).render('login', { title: 'login' });
});

module.exports = router;
