const express = require('express');
const router = express.Router();

router.get('/:problem_id', (req, res, next) => {
  res.render('success', { title: 'success' });
  console.log('problem_get');
});

router.post('/:problem_id', (req, res, next) => {
  console.log('problem_post');
});

module.exports = router;
