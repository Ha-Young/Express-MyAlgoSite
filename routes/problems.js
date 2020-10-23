const express = require('express');
const verifyUser = require('./middlewares/authorization').verifyUser;
const problemsController = require('./controllers/problems.controller');
const ROUTES = require('../constants').ROUTES;

const router = express.Router();

router.get(ROUTES.HOME, verifyUser, problemsController.redirectHome);
router.get(ROUTES.PROBLEM, verifyUser, problemsController.getProblem);
router.post(ROUTES.PROBLEM, verifyUser, problemsController.postSolution);

module.exports = router;
