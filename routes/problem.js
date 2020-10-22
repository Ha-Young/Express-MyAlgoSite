const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

router.get('/:problem_id', problemController.getProblem);
router.post('/:problem_id', problemController.receiveUserSolution);

module.exports = router;
