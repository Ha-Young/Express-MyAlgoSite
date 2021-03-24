const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth.controller");

router
  .route('/')
  .get(authController.getLoginForm);

router
  .route('/signup')
  .get(authController.getSignUpForm)
  .post(authController.createUser);

router
  .route('/login')
  .post(authController.authenticateLocal);

router
  .route('/logout')
  .get(authController.logOut)

module.exports = router;
