const express = require('express');
const authController = require('./controllers/auth.controller');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);
router.get('/github/callback', authController.getGithubCallback);

module.exports = router;
