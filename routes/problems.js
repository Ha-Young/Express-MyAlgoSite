const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controllers');

router.get('/:problem_id',
  require('connect-ensure-login').ensureLoggedIn(),
  problemsController.getProblemDetail);

router.post('/:problem_id',
  require('connect-ensure-login').ensureLoggedIn(),
  problemsController.createUserSolution);

module.exports = router;
