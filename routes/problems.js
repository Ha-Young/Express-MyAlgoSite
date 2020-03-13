const express = require('express');
const router = express.Router();

const checkAuthentication = require('./middlewares/authenticate');
const problemControllers = require('./controllers/problems.controllers');

router.get('/:problem_id', checkAuthentication, problemControllers.renderProblem);
router.post('/:problem_id', checkAuthentication, problemControllers.checkUserSolution);

module.exports = router;
