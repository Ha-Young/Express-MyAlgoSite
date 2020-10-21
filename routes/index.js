const express = require('express');
const verifyUser = require('./middlewares/authorization').verifyUser;
const problemsController = require('./controllers/problems.controller');

const router = express.Router();

router.get('/', verifyUser, problemsController.getAllProblems);

module.exports = router;
