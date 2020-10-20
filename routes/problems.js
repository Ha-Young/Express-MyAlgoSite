/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const problemController = require('./controllers/problem.controller');

/* GET home page. */
router.get('/', problemController.getAll);
router.get('/:problem_id', problemController.getOne);
// router.put("/:problem_id", problemController.update);
// router.delete("/:problem_id", problemController.delete);

module.exports = router;
