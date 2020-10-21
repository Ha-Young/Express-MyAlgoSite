const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('./middlewares');
const { getAll } = require('./controllers/problem.controller');

router.get('/', ensureAuthenticated, getAll, (req, res, next) => {
  res.render('index', { problems: req.problems });
});

module.exports = router;
