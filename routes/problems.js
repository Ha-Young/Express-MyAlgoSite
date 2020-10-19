const express = require('express');
const verifyUser = require('./middlewares/authorization').verifyUser;
const router = express.Router();

const DUMMY = require('../models/sample_problems.json');

router.get('/:problem_id', verifyUser, (req, res, next) => {
  const { params: { problem_id } } = req;

  res.render('problem', { params: problem_id, user: 'TOGGO' });
});

router.post('/:problem_id', verifyUser, (req, res, next) => {
  console.log('문제 받음');
  res.status(200).send('ok');
});

module.exports = router;
