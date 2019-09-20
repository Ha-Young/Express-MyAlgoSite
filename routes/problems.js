const router = require('express').Router();
const problemsController = require('./controllers/problems.controller');

router.get('/:problem_id', problemsController.getProblem);
router.post('/:problem_id/solution', problemsController.checkSolution);

module.exports = router;
