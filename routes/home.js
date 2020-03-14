const express = require('express');
const router = express.Router();
const authorization = require('../middleware/auth');
const controller = require('./controllers/home.Controller');

router.get('/', authorization, controller.showIndex);
router.get('/login', controller.showLogin);
router.get('/logout', controller.logOut);
router.get('/login/github', controller.handleGithub);
router.get('/login/github/callback', controller.handleGithubCallback);

module.exports = router;
