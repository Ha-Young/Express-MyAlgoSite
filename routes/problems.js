const express = require('express');
const router = express.Router();
const authorization = require('../middleware/auth');
const controller = require('./controllers/problem.Controller');

router.get('/:problem_id', authorization, controller.getProblemId, controller.showProblem);

router.post('/:problem_id', authorization, controller.checkProblem);

module.exports = router;
