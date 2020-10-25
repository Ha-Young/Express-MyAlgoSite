const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');
const { INDEX } = require('../constants/index');
const { checkIsLoggedIn } = require('./middlewares/checkIsLoggedIn');

router.get('/', checkIsLoggedIn, async (req, res, next) => {
  try {
    const problems = await problemsController.getAll();

    res.render(INDEX, { problems });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
