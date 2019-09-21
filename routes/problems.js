const router = require('express').Router();
const problem = require('../models/Problem');

router.get('/:id', async (req, res) => {
  const problems = await problem.find({});

  const findIndex = problems.findIndex(
    problem => problem.id === parseInt(req.params.id)
  );

  res.render('problems', { user: req.user, problems, index: findIndex });
});

router.post('/success', async (req, res) => {
  const problems = await problem.find({});

  const findIndex = problems.findIndex(
    problem => problem.id === parseInt(req.params.id)
  );

  res.render('success', { user: req.user, problems, index: findIndex });
});

module.exports = router;
