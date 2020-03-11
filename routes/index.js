const express = require('express');
const Problem = require('../models/Problem');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const problems = await Problem.find();
  res.render('index', { 
    title: '바닐라코딩',
    problems
   });
});

router.get('/:level', async (req, res, next) => {
  const problems = await Problem.find({ difficulty_level: req.params.level });
  res.render('index', {
    title: '바닐라코딩',
    problems
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
