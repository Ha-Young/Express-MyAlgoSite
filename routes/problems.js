const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', (req, res, next) => {
  Problem.findOne({ id: req.params.problem_id }, function(err, problem) {
    res.render('problems',
      { title: problem.title,
        completed_users: problem.completed_users || 0,
        difficulty_level: problem.difficulty_level,
        description: problem.description,
        id: problem.id
      }
    );
  });
});

router.post('/:problem_id', async function(req, res, next) {
  res.status(201);
  var code = req.body.solution;
  var fn = new Function(code);

  Problem.findOne({ id: req.params.problem_id }, function(err, problem) {
    console.log(fn)
    console.log(problem.test)

  });

  try {
    let docs = await Problem.findOne({ id: req.params.problem_id }, function(err, problem) {
      problem.tests.forEach(e => console.log(e))

    })
    res.json({ docs });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

/*
problem_id에 해당하는 문제의 상세 정보(문제 이름, 정답자 수, 문제 레벨, 그리고 문제에 대한 설명 등)을 화면에 보여주세요. UI 구성은 자유롭게 해주세요.

 문제에 대한 솔루션 코드를 입력할 수 있는 폼과 정답을 제출할 수 있는 버튼을 보여주세요. res.send(req.params)

 해당 폼을 작성하여 "제출" 버튼을 눌렀을때, POST /problems/:problem_id로 솔루션 정보를 보내세요. AJAX는 사용하지 마세요. */