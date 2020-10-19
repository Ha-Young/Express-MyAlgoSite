const express = require('express');
const router = express.Router();

// VerifyLogin middleware 추가 예정
router.get('/problems/:problem_id', (res, req, next) => {
  res.send('problems showing page');
});

router.post('/problems/:problem_id', (res, req, next) => {
  res.send('each problem page');
});

module.exports = router;
