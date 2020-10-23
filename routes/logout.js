const express = require('express');
const router = express.Router();
const { LOGIN_PAGE_URL } = require('../constants/index');

router.get('/', (req, res, next) => {
  try {
    req.logout();
    res.redirect(LOGIN_PAGE_URL);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
