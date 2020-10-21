const express = require('express');
const fs = require('fs');
const router = express.Router();
const Problem = require('../models/Problem');

const problems = JSON.parse(
  fs.readFileSync(`${__dirname}/../models/sample_problems.json`)
);

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.send('hi');
});

module.exports = router;

// try {
//   const problemList = [];
//   const searchProblems = await problems.forEach(async (problem) => {
//     try {
//       const identified = new Problem(problem);
//       const searched = await Problem.findById(identified._id);
//       if (searched) {
//         console.log('ser');
//         return problemList.push(searched);
//       }

//       const created = await Problem.create(problem);
//       console.log(created, 'cre');
//       return problemList.push(created);
//     } catch (err) {
//       console.log(err, 'errrr');
//     }
//   });

//   console.log(problemList, 'pl');
// } catch (err) {
//   console.log(err, 'err');
// }

// const mapped = await Promise.all(
//   problems.map(async (problem) => {
//     try {
//       let result = new Problem(problem);
//       // console.log(result, 'b4 save');
//       result = await result.save();
//       // console.log(result, 'af save');
//       console.log(1);
//       if (result) return result;
//     } catch (err) {
//       console.log(err, 'fail');
//     }
//   })
// );
// console.log(mapped.length, 'maped');

// Promise.all(
//   problems.map((problem) => {
//     const result = new Promise(problem).save();
//     console.log(result, 'result');
//     return result;
//   })
// )
//   .then((res) => console.log(res, 'res'))
//   .catch((err) => console.log(err, 'err'));
