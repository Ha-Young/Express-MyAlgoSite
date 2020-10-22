const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problems.controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.get('/:problem_id', isAuthenticated, problemsController.getProblem);
router.post('/:problem_id', isAuthenticated, problemsController.postSolution);

module.exports = router;
