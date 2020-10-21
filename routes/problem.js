const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', async (req, res, next) => {
  const id = req.params.problem_id;
  const problem = await Problem.find({ id });

  res.render('problem', {
    id: problem[0].id,
    title: problem[0].title,
    level: problem[0].difficulty_level,
    completeUsers: problem[0].complete_user,
    description: problem[0].description,
  });
});

router.post('/:problem_id', async (req, res, next) => {
  console.log(req.body, '123');
  const userSolution = req.body.code;
  const solution = await new Function(`return ${userSolution}`)();

  res.json('1');
});

module.exports = router;
