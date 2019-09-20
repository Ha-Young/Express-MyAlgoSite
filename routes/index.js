const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth');
  } else {
    res.redirect('/problems');
  }
});

module.exports = router;
