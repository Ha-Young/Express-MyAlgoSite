const express = require('express');
const verifyUser = require('./middlewares/authorization').verifyUser;
const problemsController = require('./controllers/problems.controller');

const router = express.Router();

router.get('/:problem_id', verifyUser, problemsController.getAll);
router.post('/:problem_id', verifyUser, problemsController.post);

module.exports = router;
