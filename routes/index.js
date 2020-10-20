const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const data = await fetch('http://localhost:3000/sample_problems.json');

  const problems = await data.json();

  res.render('index', { title: '바닐라코딩', problems});
});

module.exports = router;
