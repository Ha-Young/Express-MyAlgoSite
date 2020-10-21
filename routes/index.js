const express = require('express');
const fs = require('fs');
const router = express.Router();
const Problem = require('../models/Problem');

const problems = JSON.parse(
  fs.readFileSync(`${__dirname}/../models/sample_problems.json`)
);

/* GET home page. */
router.get('/', (req, res, next) => {
  const mapped = problems.map((problem) => {
    const result = new Problem(problem);
    result.link = `problem/${problem.id}`;
    result.save();
    return result;
  });

  res.render('index', { data: mapped });
});

module.exports = router;
