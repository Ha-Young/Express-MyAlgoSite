const express = require('express');
const router = express.Router();
const sampleProblems = require('../models/sample_problems');
// TODO✅: ❓json 파일을 가지고 오는 방법? => 일반 require 방식과 같음

const Problem = require('../models/Problem');

/* GET home page. */
router.get('/', async (req, res, next) => {
  console.log(req.body);
	let problems = await Problem.find();
	if (!problems.length) {
		await Problem.insertMany(sampleProblems).catch((err) => {
      next(err);
    });
  }
	// TODO✅: 일단 JSON 를 넣어서 보여줄것
	// TODO: app.js 에서 데이터 베이스 연결하고 실제 데이ㅌ 베이스에는 샘플을 한번만 저장
	// TODO : 이곳에서는 problems를 db에서  모조리 불러다가 보여주면 됨 .
	res.render('index', { title: '코드전쟁', problems: problems });
});

module.exports = router;
