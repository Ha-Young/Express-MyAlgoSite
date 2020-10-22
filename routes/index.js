const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const managementController = require('../controllers/managementController');

router.get('/', problemController.getAllProblems);
router.get('/management', managementController.getStats);

module.exports = router;
