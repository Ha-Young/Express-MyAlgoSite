const express = require('express');
const router = express.Router();
const authenticateUser = require('./middlewares/authenticateUser');
const {
  getUserCode,
  getProblemInfo,
  setCodeCookie,
  executeCode,
  checkAnswer,
  updateSuccessCodeToUser,
  updateSuccessUserToProblem
} = require('./controllers/problem.controller');

router.get('/:problemId', authenticateUser, getUserCode, getProblemInfo);
router.post('/:problemId',
  authenticateUser,
  setCodeCookie,
  executeCode,
  checkAnswer,
  updateSuccessCodeToUser,
  updateSuccessUserToProblem
);

module.exports = router;
