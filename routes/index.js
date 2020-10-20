const express = require('express');
const router = express.Router();
const indexContorller = require('../controllers/index.controller');

/* GET home page. */
router.get('/', indexContorller.getHome);

module.exports = router;
