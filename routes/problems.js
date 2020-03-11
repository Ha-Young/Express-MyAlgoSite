const express = require('express');
const router = express.Router();
const { isSeccesss } = require('./middlewares');

const problemData = require('../models/sample_problems.json');

router.get('/:problem_id', (req, res, next) => {
    const result = problemData.filter((el) => {
        return String(el.id) === req.params.problem_id
    })[0];

    res.render('problem', {
        title: '문제 페이지',
        problem_id: result.id,
        problemTitle: result.title,
        completed_users: result.completed_users,
        level: result.difficulty_level,
        description: result.description
    })
})

router.post('/:problem_id', isSeccesss, (req, res, next) => {
    res.render('success')
})


module.exports = router;
