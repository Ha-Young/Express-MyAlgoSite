const express = require('express');
const router = express.Router();

const problemsController = require('../controllers/problems');

router.get('/:problem_id', problemsController.getProblem);
router.post('/:problem_id', problemsController.postProblem);

module.exports = router;
