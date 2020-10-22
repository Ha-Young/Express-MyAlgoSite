const express = require('express');
const router = express.Router();

const { successLogin, failedLogin } = require('../controllers/auth.controller');

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next)  => res.render('login'));
router.get('/github', successLogin);
router.get('/github/callback', failedLogin);

module.exports = router;
