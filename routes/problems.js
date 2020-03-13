const express = require('express');
const router = express.Router();
const { isSeccesss, isLoggedIn } = require('./middlewares');
const Problem = require('../models/Problem');

router.get('/:problem_id', isLoggedIn, (req, res, next) => {

    const id = Number(req.params.problem_id);

    Problem.findOne({ id: id}).then((el)=>{
        const result = el;

        if (!result) {
            const err = new Error('Not Found');
            err.status = 404;
            return next(err);
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

});

router.post('/:problem_id', isSeccesss, (req, res, next) => {
    res.status(302).render('success');
});

module.exports = router;
