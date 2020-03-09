const express = require('express');
const router = express.Router();
const { getProblemsDetail, postProblemsDetail } = require('../controls/problems');
const { onlyPrivate } = require('../middlewares');

router.get('/:problem_id', onlyPrivate, getProblemsDetail);

router.post('/:problem_id', onlyPrivate, postProblemsDetail);

module.exports = router;
