const express = require('express');
const router = express.Router();

const home = require('./home');
const login = require('./login');
const auth = require('./auth');

router.use('/', home);
router.use('/login', login);
router.use('/auth', auth);

module.exports = router;
