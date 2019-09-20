const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const problemsController = require('./controllers/problems.controller');

router.get('/', ensureLoggedIn, problemsController.getAll);
router.get('/:problem_id', ensureLoggedIn, problemsController.getOne);
router.post('/:problem_id/solution', ensureLoggedIn, problemsController.checkSolution);

//   const kim = param.indexOf('Kim'); return `김서방은 ${kim}에 있다`

module.exports = router;
