const express = require('express');
const router = express.Router();

const loginController = require("../controllers/auth.controller");

router
  .route('/')
  .get(loginController.getLoginForm);

router
  .route('/signup')
  .get(loginController.getSignUpForm)
  .post(loginController.createUser);

router
  .route('/login')
  .post(loginController.authenticateLocal);

module.exports = router;
