const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problems.controller');

router.get('/:problem_id', problemsController.getProblem);

router.post('/:problem_id');

module.exports = router;
