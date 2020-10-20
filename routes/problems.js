const express = require('express');
const fetch = require('node-fetch');
const { render } = require('../app');
const router = express.Router();

router.get('/:problem_id', async (req, res) => {
  const id = req.params.problem_id;
  const data = await fetch('http://localhost:3000/sample_problems.json');
  const problems = await data.json();

  console.log(problems);

  const problem = problems.find((prblm) => {
    return prblm.id === parseInt(id);
  });

  console.log(problem);

  res.render('problem', { problem });
});

module.exports = router;
