const express = require('express');
const router = express.Router();

const globalController = require('../controllers/global');

router.get('/', globalController.getHome);

router.get('/join', globalController.getJoin);
router.post('/join', globalController.postJoin);

router.get('/login', globalController.getLogin);
router.post('/login', globalController.postLogin);

router.get('/logout', globalController.getLogout);

module.exports = router;
