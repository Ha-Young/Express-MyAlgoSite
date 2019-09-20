const express = require('express');
const router = express.Router();
const loginController = require('./controllers/auth.controller');

router.get('/', loginController.login);
router.get('/logout', loginController.logout);
router.get('/github', loginController.github);
router.get('/github/callback', loginController.githubCallback);
router.get('/google', loginController.google);
router.get('/google/callback', loginController.googleCallback);

module.exports = router;
