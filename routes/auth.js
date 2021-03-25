const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.use(authController.checkAuthentication);

router
  .route('/signup')
  .get(authController.getSignUpForm)
  .post(authController.createUser);

router
  .route('/login')
  .get(authController.getLoginForm)
  .post(authController.authenticateLocal);

router
  .route('/logout')
  .get(authController.logOut)

module.exports = router;
