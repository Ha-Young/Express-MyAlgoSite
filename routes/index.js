const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const problemController = require('./controllers/problemController');

router.get('/',
  authController.isLoggedIn,
  problemController.getAll
);

router.get('/login',
  authController.isNotLoggedIn,
  authController.renderLogin
);

router.get('/auth/google',authController.authenticateGoogle);

router.get('/auth/google/callback',
  authController.failureGoogleLogin,
  authController.successGoogleLogin
);

router.get('/logout', authController.logout);

router.get('/problems/:problem_id', authController.isLoggedIn, problemController.getProblem);

router.post('/problems/:problem_id', authController.isLoggedIn, problemController.checkProblem);

module.exports = router;
