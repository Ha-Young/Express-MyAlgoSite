const express = require('express');
const router = express.Router();
const problemsController = require("../controllers/problems.controller");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('problem', { title: '바닐라코딩' });
});

module.exports = router;
