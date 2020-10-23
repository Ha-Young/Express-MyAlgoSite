const express = require('express');
const logout = require('./middleware/logout.js');

const router = express.Router();

router.post('/', logout, (req, res, next) => {
  res.redirect('/login');
});

module.exports = router;
