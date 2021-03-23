const express = require('express');
const router = express.Router();

router.get('/:problem_id', (req, res, next) => {
  const problemId = req.params.problem_id;

  res.render('problem', { title: 'problem' });
});

module.exports = router;
