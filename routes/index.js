const express = require('express');
const router = express.Router();
const forwardAuthenticated = require('./middlewares/forwardAuthenticated');
const homeController = require('./controllers/home.controller');
const signInController = require('./controllers/signIn.controller');
const signOutController = require('./controllers/signOut.ocntroller');
const signUpController = require('./controllers/signUp.controller');
const deleteAccountController = require('./controllers/deleteAccount.controller');

/* GET home page. */
router.get('/', forwardAuthenticated, homeController.getAll);

router.get('/sign-in', signInController.get);
router.post('/sign-in', signInController.postLocal);

router.get('/sign-in/github', signInController.getGithub);
router.get('/sign-in/github/callback', signInController.postGithub);

router.get('/sign-out', forwardAuthenticated, signOutController.get);
router.get('/sign-out/callback', forwardAuthenticated, signOutController.callback);

router.get('/sign-up', signUpController.get);
router.post('/sign-up', signUpController.post);

router.get('/delete-account', forwardAuthenticated, deleteAccountController.get);
router.get('/delete-account/callback', forwardAuthenticated, deleteAccountController.callback);

module.exports = router;
