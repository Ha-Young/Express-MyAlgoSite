const express = require('express');
const router = express.Router();
const { isSeccesss, isLoggedIn } = require('./middlewares');
const problemData = require('../models/sample_problems.json');

router.get('/:problem_id', isLoggedIn, (req, res, next) => {
    const result = problemData.find((el) => {
        return String(el.id) === req.params.problem_id
    });

    res.render('problem', {
        title: 'Q',
        problem_id: result.id,
        problemTitle: result.title,
        completed_users: result.completed_users,
        level: result.difficulty_level,
        description: result.description
    });
})

router.post('/:problem_id', isSeccesss, (req, res, next) => {
    res.render('success');
});

module.exports = router;
