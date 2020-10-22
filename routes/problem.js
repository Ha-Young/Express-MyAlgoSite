const express = require('express');
const router = express.Router();
const vm = require('vm');
const Problem = require('../models/Problem');
const problemController = require('../controllers/problemController');

router.get('/:problem_id', problemController.getProblem);

router.post('/:problem_id', problemController.receiveUserSolution);

module.exports = router;

// async (req, res, next) => {
//   const id = req.params.problem_id;
//   const problem = await Problem.find({ id });

//   res.render('problem', {
//     id: problem[0].id,
//     title: problem[0].title,
//     level: problem[0].difficulty_level,
//     completeUsers: problem[0].complete_user,
//     description: problem[0].description,
//   });
// };

// async (req, res, next) => {
//   const problemNumber = req.params.problem_id;
//   const problem = await Problem.find({ id: problemNumber });
//   const solution = await new Function(`return ${req.body.code}`)();

//   const context = { solution };
//   vm.createContext(context);

//   let isAnswer = true;
//   problem[0].tests.forEach(async (test) => {
//     const code = `var result = ${test.code};`;
//     vm.runInContext(code, context);
//     const asnwerSheet = Number(test.solution) || test.solution;

//     if (asnwerSheet === 'false' || asnwerSheet === 'true') {
//       asnwerSheet = Boolean(asnwerSheet);
//     }

//     if (context.result !== asnwerSheet) {
//       return (isAnswer = false);
//     }
//   });
//   return isAnswer ? res.render('success') : res.render('failure');
// }
