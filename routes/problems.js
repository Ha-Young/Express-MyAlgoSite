const express = require('express');
const router = express.Router();
const { isSeccesss, isLoggedIn } = require('./middlewares');
const problemData = require('../models/sample_problems.json');

router.get('/:problem_id', isLoggedIn, (req, res, next) => {
    const result = problemData.find((el) => {
        return String(el.id) === req.params.problem_id
    });
    if (!result) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
    res.status(302).render('problem', {
        title: 'Q',
        problem_id: result.id,
        problemTitle: result.title,
        completed_users: result.completed_users,
        level: result.difficulty_level,
        description: result.description
    });
});

router.post('/:problem_id', isSeccesss, (req, res, next) => {
    res.status(302).render('success');
});

module.exports = router;
