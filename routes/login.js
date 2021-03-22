const express = require('express');
const router = express.Router();
const loginController = require("../controllers/login.controller");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login', { title: '바닐라코딩' });
});

module.exports = router;
