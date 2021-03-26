const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');

router.get(
  '/:problem_id',
  problemsController.getOneProblem
);

router.post(
  '/:problem_id',
  problemsController.getOneAndUpdateProblem
);

module.exports = router;
