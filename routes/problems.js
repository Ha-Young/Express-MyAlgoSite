const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const problemsController = require('../controllers/problems.controller');

router.get('/:problem_id', authenticateUser, problemsController.getProblem);
router.post('/:problem_id', authenticateUser, problemsController.checkAnswer);

module.exports = router;
