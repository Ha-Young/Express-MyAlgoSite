const express = require('express');
const router = express.Router();
const { validateUser } = require('./middlewares/userValidation');
const { getOne, submitHandler } = require('./controllers/problems.controller');
const { PROBLEM_NUM_URL } = require('../constants/index');

router.get(PROBLEM_NUM_URL, validateUser, getOne);
router.post(PROBLEM_NUM_URL, validateUser, submitHandler);

module.exports = router;
