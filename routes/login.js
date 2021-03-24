const express = require('express');
const router = express.Router();

module.exports = function (passport) {
  const loginController = require("../controllers/login.controller")(passport);

  router
    .route('/')
    .get(loginController.getLoginForm)

  router
    .route('/signup')
    .get(loginController.getSignUpForm)
    .post(loginController.createUser)

  router
    .route('/signin')
    .post(loginController.authenticateLocal);

  return router;
}
