const vm = require('vm');
const Problems = require('../../models/Problem.js');

async function gradeTests(req, res, next) {
  const resultArray = [];

  try {
    const problem = await Problems.findOne({ id: req.params.id });
    const numberOfTests = problem.tests.length;

    const code = req.body.editor;
    const realFunction = new Function(`return ${code}`)();

    const context = { solution: realFunction };
    vm.createContext(context);

    let count = 0;

    for (let i = 0; i < numberOfTests; i++) {
      const code = `var submitResult = ${problem.tests[i].code}`;

      vm.runInContext(code, context, { timeout: 1000 });

      if (context.submitResult === problem.tests[i].solution) {
        count++;
        resultArray[i] = true;
      } else {
        resultArray[i] = false;
      }
    }

    if (count === numberOfTests) {
      res.render('success', {
        message: '정답',
        testsInfo: resultArray
      });
    } else {
      res.render('failure', {
        message: '실패',
        testsInfo: resultArray
      });
    }
  } catch (err) {
    res.render('failure', {
      message: "오류",
      testsInfo: resultArray,
      errMessage: err.message
    });
  }
}

module.exports = gradeTests;
