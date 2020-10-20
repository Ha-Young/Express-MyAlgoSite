/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const problemController = require('./controllers/problem.controller');

/* GET home page. */
router.get('/', problemController.getAll);
router.get('/:problem_id', problemController.getOne);
router.post('/:problem_id', problemController.getResult);

module.exports = router;
