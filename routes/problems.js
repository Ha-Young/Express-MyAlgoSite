const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');

router.get('/', problemsController.getAll);
