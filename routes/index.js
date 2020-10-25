const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');
const { INDEX } = require('../constants/index');
const { checkIsLoggedIn } = require('./middlewares/checkIsLoggedIn');
const tryCatchWrapper = require('../utils/tryCatchWrapper');

router.get('/', checkIsLoggedIn, tryCatchWrapper(async (req, res, next) => {
  const problems = await problemsController.getAll();

  res.render(INDEX, { problems });
}));

module.exports = router;
