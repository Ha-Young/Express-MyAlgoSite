const express = require('express');
const router = express.Router();

// VerifyLogin middleware 추가 없음 - login, logout 모두 접속 가능
router.get('/', (req, res, next) => {
  res.send('login page');
});

module.exports = router;
