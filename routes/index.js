const express = require('express');
const router = express.Router();
const authCheck = require('./middlewares/checkAuth');
const indexController = require('./controllers/index.controller');

/* GET home page. */
router.get('/', authCheck, indexController.loadMain);
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Vanilla'});
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
