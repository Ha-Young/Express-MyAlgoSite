const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem'); 

router.get('/:id', async(req, res, next) => {
  if (!req.user) res.redirect('/login');
  
  try {
    const id = req.params.id;
    const problemData = await Problem.findById(id);
    
    res.render('problemDetail', { problemData });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
