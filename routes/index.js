const express = require('express');
const router = express.Router();
const authentication = require('./middleware/authentication');

/* GET home page. */
router.get('/', authentication.ensureLoggedIn, (req, res, next) => {
  res.redirect('/problems');
});

module.exports = router;
