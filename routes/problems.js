const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('./middleware/ensureLogin');
const problemsController = require('./controllers/problems.controller');

router.get('/', ensureLoggedIn.isLoggedIn, problemsController.getAll);
router.get('/:problem_id', ensureLoggedIn.isLoggedIn, problemsController.getOne);
router.post('/:problem_id/solution', ensureLoggedIn.isLoggedIn, problemsController.checkSolution);

module.exports = router;
