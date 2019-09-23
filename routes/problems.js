const express = require('express');
const router = express.Router();
const authentication = require('./middleware/authentication');
const problemsController = require('./controllers/problems.controller');

router.get('/', authentication.ensureLoggedIn, problemsController.getAll);
router.get('/:problem_id', authentication.ensureLoggedIn, problemsController.getOne);
router.post('/:problem_id/solution', authentication.ensureLoggedIn, problemsController.checkSolution);

module.exports = router;
