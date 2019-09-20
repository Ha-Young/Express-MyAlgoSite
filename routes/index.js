const router = require('express').Router();
const problemsController = require('./controllers/problems.controller')

const checkAuth = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

router.get('/', checkAuth, problemsController.getAll);

module.exports = router;
