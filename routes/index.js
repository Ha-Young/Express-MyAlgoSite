const express = require('express');
const router = express.Router();
const indexContorller = require('../controllers/index.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');
const setLocals = require('../middlewares/setLocals');

/* GET home page. */
router.get('/', isAuthenticated, setLocals, indexContorller.getHome);

module.exports = router;
