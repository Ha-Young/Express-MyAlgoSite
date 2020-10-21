const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/', authenticateUser, indexController.getAllProblems);
router.get('/login', indexController.logIn);
router.get('/logout', indexController.logOut);

module.exports = router;
