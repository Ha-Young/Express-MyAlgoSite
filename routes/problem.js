const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', async (req, res, next) => {
  try{
    const problemInfo = await Problem.findById(req.params.problem_id).lean();
    res.render('problem', { problemInfo });
  } catch(e) {
    next(e);
  }
})

module.exports = router;
