const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problems.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');
const setLocals = require('../middlewares/setLocals');

router.get('/:problem_id', isAuthenticated, setLocals, problemsController.getProblem);
router.post('/:problem_id', isAuthenticated, problemsController.postSolution);
router.get('/', isAuthenticated, setLocals, problemsController.getfilteredProblems);

module.exports = router;
