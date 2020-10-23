const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (!req.user) {
    try {
      res.status(302).redirect('/login');

      return;
    } catch (err) {
      next(err);
    }
  }

  try {
    const problems = await problemsController.getAll();

    res.render('index', { problems });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
