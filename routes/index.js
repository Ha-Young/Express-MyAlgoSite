const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  if(!req.user) return res.status(302).redirect('login');
  res.status(302).redirect('/problem');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(302).redirect('/');
});

module.exports = router;
