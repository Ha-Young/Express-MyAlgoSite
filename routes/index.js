const express = require('express');
const router = express.Router();
const { verifyUser } = require('./middlewares/verifyUser');
const problemsController = require('./controllers/problems.controller');

router.get('/', verifyUser, problemsController.getAll);

module.exports = router;
