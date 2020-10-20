const express = require('express');
const router = express.Router();

const problemsController = require('../controllers/problems');
const requiresLogin = require('../controllers/middlewares/requiresLogin');

router.get('/:problem_id', requiresLogin, problemsController.getProblem);
router.post('/:problem_id', requiresLogin, problemsController.postProblem);

module.exports = router;
