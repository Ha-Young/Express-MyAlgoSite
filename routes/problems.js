const express = require('express');
const router = express.Router();

const problemData = require('../models/sample_problems.json');

router.get('/:problem_id', (req, res, next) => {
    console.log('problem_id???????',req.params.problem_id)
    const result = problemData.filter((el)=>{
        return String(el.id) === req.params.problem_id
    })[0]
    console.log('------result-------', result);
    res.render('problem', {
        title: '문제 페이지',
        problemTitle: result.title,
        completed_users: result.completed_users,
        level: result.difficulty_level,
        description: result.description
    })
})




module.exports = router;