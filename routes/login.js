const express = require('express');
const router = express.Router();
const errors = require('../helpers/error');

router.get('/login', (req, res, next) => {
  try {
    res.render('socialLogin');
  } catch (error) {
    next(new errors.GeneralError(error));
  }
})

module.exports = router;
