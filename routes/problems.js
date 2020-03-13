const express = require('express');
const { onlyPrivate } = require('../middlewares');
const {
  getAddCase,
  postAddCase,
  getProblemsDetail,
  postProblemsDetail
} = require('../controls/problems');

const router = express.Router();

router.get('/:problem_id/addCase', onlyPrivate, getAddCase);

router.post('/:problem_id/addCase', onlyPrivate, postAddCase);

router.get('/:problem_id', onlyPrivate, getProblemsDetail);

router.post('/:problem_id', onlyPrivate, postProblemsDetail);

module.exports = router;
