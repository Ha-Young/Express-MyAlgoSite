const express = require('express');
const router = express.Router();

const authenticateUser = require("./middlewares/authenticateUser");

/* GET home page. */
router.get('/', authenticateUser, (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

module.exports = router;
