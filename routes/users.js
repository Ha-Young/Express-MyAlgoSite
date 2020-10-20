const express = require('express');
const router = express.Router();
const usersController = require('./controllers/users.controller');

router.get('/', usersController.getAll);
router.post('/new', usersController.create);
router.put('/:user_id', usersController.update);
router.delete('/:user_id', usersController.delete);

module.exports = router;
