const express = require('express');
const router = express.Router();
const { validateUser } = require('./middlewares/validateUser');
const { validateSubmitRequest } = require('./middlewares/validateSubmitRequest');
const { getOne, submitHandler } = require('./controllers/problems.controller');
const { PROBLEM_NUM_URL } = require('../constants/index');

router.get(PROBLEM_NUM_URL, validateUser, getOne);
router.post(PROBLEM_NUM_URL, validateUser, validateSubmitRequest, submitHandler);

module.exports = router;
