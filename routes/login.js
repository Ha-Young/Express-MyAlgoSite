const express = require('express');
const router = express.Router();

const loginController = require("../controllers/login.controller");

router
  .route('/')
  .get(loginController.getLoginForm);

router
  .route('/signup')
  .get(loginController.getSignUpForm)
  .post(loginController.createUser);

router
  .route('/signin')
  .post(loginController.authenticateLocal);

module.exports = router;
