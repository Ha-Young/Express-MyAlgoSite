const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

// router.post('/byLevel', problemController.filterByLevel,);
router.get('/', problemController.renderMainPage);
router.get('/problem/:problem_id', problemController.getProblem);
router.post('/problem/:problem_id', problemController.receiveUserSolution);

module.exports = router;
