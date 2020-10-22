const express = require('express');
const authController = require('./controllers/auth.controller');
const ROUTES = require('../constants').ROUTES;

const router = express.Router();

router.get(ROUTES.LOGIN, authController.getLogin);
router.post(ROUTES.LOGIN, authController.postLogin);
router.get(ROUTES.LOGOUT, authController.getLogout);
router.get(ROUTES.GITHUB_CALLBACK, authController.getGithubCallback);

module.exports = router;
