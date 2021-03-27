const express = require('express');
const router = express.Router();
const login = require('./login');
const auth = require('./auth');
const problems = require('./problems');
const user = require('./user');
const home = require('./home');
const { verifyUser } = require('./middlewares/verifyUser');

router.use('/login', login);
router.use('/auth', auth);
router.use(verifyUser);
router.use('/', home);
router.use('/problems', problems);
router.use('/user', user);

module.exports = router;
