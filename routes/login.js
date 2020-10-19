const express = require('express');
const passport = require('passport');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.session);
  res.render('login');
});

router.post('/', passport.authenticate('github'));

module.exports = router;
