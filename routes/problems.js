const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');
const { isLoggedIn } = require('./middlewares/authorization');

router.get('/:problem_id', isLoggedIn, problemsController.getProblem);

router.post('/:problem_id', isLoggedIn, problemsController.submitAnswer);

module.exports = router;
