const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');
const { ensureAuthenticated } = require('./middlewares/authorization');

router.get('/', ensureAuthenticated, problemsController.getAll);
router.get('/:problem_id', ensureAuthenticated, problemsController.getSelectedProblem);
router.post('/:problem_id', ensureAuthenticated, problemsController.solvedSelectedProblem);

module.exports = router;
