/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/auth.middleware');

router.get('/', authenticateUser, (req, res, next) => res.redirect('/problems'));

module.exports = router;
