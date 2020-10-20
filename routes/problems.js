const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const problemsController = require('../controllers/problems.controller');

router.get('/:problem_id', problemsController.getProblem);

module.exports = router;
