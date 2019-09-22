const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('./middleware/ensureLogin');

/* GET home page. */
router.get('/', ensureLoggedIn, (req, res, next) => {
  res.redirect('/problems');
});

module.exports = router;
