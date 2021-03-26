const express = require('express');
const router = express.Router();
const usersController = require('./controllers/users.controller');

router.get('/:user_id', usersController.getUser);

router.get('/:user_id/:problem_id', usersController.getUserSubmissions);

module.exports = router;
