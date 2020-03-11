const express = require('express');
const router = express.Router();
const verifyLogin = require('./middlewares/authorization').verifyLogin;
const fs = require('fs');
const path = require('path');

const rawdata = fs.readFileSync(path.join(__dirname, '../models/sample_problems.json'));
const problems = JSON.parse(rawdata);

router.get('/', verifyLogin, (req, res, next) => {
// router.get('/', (req, res, next) => { // I have removed verifyLogin, for covnenience
  res.render('index', { 
    title: '바닐라코딩',
    problems
  });
});

module.exports = router;
