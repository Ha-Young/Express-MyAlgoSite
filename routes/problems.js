const express = require('express');
const router = express.Router();
const problemsController = require("../controllers/problems.controller");

router
  .route('/:id')
  .get(problemsController.get)
  .post(problemsController.post);

module.exports = router;
