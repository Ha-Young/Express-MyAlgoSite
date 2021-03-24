const express = require('express');
const router = express.Router();
const redirectToHomeWhenAuthenticated = require('../middlewares/redirectToHomeWhenAuthenticated');
const checkAuthentication = require('../middlewares/checkAuthentication');
const authController = require('../controllers/auth.controller');

//router.use(redirectToHomeWhenAuthenticated);
//logout일 땐 checkAuthentication으로 middleware를 쓰고싶고
//나머지 path일 땐 redirectToHomeWhenAuthenticated를 쓰고싶은데 이거 middleware를
//그냥 middleware 폴더에다가 생성하면되나?

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
