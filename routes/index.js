const express = require("express");
const router = express.Router();
const { verifyToken } = require("./middlewares/authorization");

/* GET home page. */
router.get('/', verifyToken, (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
});

module.exports = router;
