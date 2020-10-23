const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');
const { LOGIN_PAGE_URL, INDEX } = require('../constants/index');

router.get('/', async (req, res, next) => {
  if (!req.user) {
    try {
      res.status(302).redirect(LOGIN_PAGE_URL);

      return;
    } catch (err) {
      next(err);
    }
  }

  try {
    const problems = await problemsController.getAll();

    res.render(INDEX, { problems });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
