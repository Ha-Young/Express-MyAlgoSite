const express = require('express');
const router = express.Router();

const checkAuthentication = require('./middlewares/authenticate');
const homeControllers = require('./controllers/home.controllers');

router.get('/', checkAuthentication, homeControllers.renderProblems);
router.get('/logout', homeControllers.logout);

module.exports = router;
