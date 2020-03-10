const express = require('express');
const fs = require('fs');
const router = express.Router();
const Problem = require('../models/Problem');
const strings = require('../constants/moduleExports');
// const  expect  = require('chai').expect;;
// const filltheArray = require('../test/problem1');



router.get('/:problem_id', async (req, res, next) => {
  testId = req.params.problem_id;
  const test = await Problem.findOne({ id: testId });
  // console.log(test);
  res.render('problem', { test: test });
});

router.post('/:problem_id', async (req, res, next) => {
  // console.log(req)
  // console.log(exportString[req.params.problem_id]);

  const code = req.body.code;
  const id = req.params.problem_id;
  const path = `./test/problem${id}.js`;
  const moduleString = strings[id];


  // console.log(moduleString)
  fs.truncate(path, 0, () => {
    const temp = moduleString.split('\n');
    temp.splice(0, 0, code);
    const testString = temp.join('\n');
    fs.appendFile(path, testString, function() {
 
    });
  });

 
  

  // const ss = fs.readFileSync('./tests/problem1.js').toString();



    // fs.readFile(code, 'utf8')
  // console.log(`./tests/problem${id}`)

  // fs.truncate('./tests/problem1.js', 0, function() {
  //   console.log(33333333333333333333);
  // });

  // const ss = fs.readFileSync('./tests/problem1.js').toString();
  // fs.appendFile('./tests/problem1.js', code, function() {
  //   console.log(22222222222)
  // });
  

});


module.exports = router;

