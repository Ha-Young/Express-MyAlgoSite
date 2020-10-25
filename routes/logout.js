const express = require('express');
const router = express.Router();
const { LOGIN_PAGE_URL } = require('../constants/index');
const tryCatchWrapper = require('../utils/tryCatchWrapper');

router.get('/', tryCatchWrapper((req, res, next) => {
  req.logout();
  res.redirect(LOGIN_PAGE_URL);
}));

module.exports = router;
