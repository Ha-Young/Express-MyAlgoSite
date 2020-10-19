const express = require('express');
const verifyUser = require('./middlewares/authorization').verifyUser;
const router = express.Router();

/* GET home page. */
router.get('/:problem_id', verifyUser, (req, res, next) => {
  const { params: { problem_id } } = req;
  res.render('problem', { params: problem_id });
});

router.post('/:problem_id', verifyUser, (req, res, next) => {
  res.status(200).send('ok');
});

module.exports = router;
