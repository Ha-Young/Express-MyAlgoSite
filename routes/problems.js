const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const problemsController = require('../controllers/problems.controller');

router.get('/:problem_id', problemsController.getProblem);
router.post('/:problem_id', problemsController.postSolution);

module.exports = router;
