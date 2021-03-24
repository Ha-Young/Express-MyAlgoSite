const express = require('express');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');
const problemsController = require('./controllers/problems.controller');

router.get('/:problem_id', verifyUser, problemsController.getOneProblem);

router.post('/:problem_id', verifyUser, problemsController.getOneAndUpdateProblem);

module.exports = router;
