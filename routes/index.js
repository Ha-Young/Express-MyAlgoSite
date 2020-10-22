const express = require('express');
const verifyUser = require('./middlewares/authorization').verifyUser;
const problemsController = require('./controllers/problems.controller');
const ROUTES = require('../constants').ROUTES;

const router = express.Router();

router.get(ROUTES.HOME, verifyUser, problemsController.getAllProblems);

module.exports = router;
