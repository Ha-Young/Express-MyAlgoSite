const express = require('express');
const router = express.Router();
const usersController = require("./controllers/users.controller");

/* GET home page. */
router.get("/login", (req, res, next) => {
  res.render('login');
});

router.post("/login/check", usersController.checkLogin);

router.get("/logout", usersController.logOut);

router.get("/signup", (req, res, next) => {
  res.render('signup');
});

router.post("/signup", usersController.signUp);

module.exports = router;
