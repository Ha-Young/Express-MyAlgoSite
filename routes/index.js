const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');

    return;
  }

  const problems = await problemsController.getAll();

  res.render('index', { problems });
});

module.exports = router;
