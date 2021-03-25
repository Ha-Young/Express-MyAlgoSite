const { VM } = require("vm2");

const Problem = require("../../models/Problem");

exports.viewProblem = async function (req, res, next) {
  const { problem_id: problemId } = req.params;

  try {
    const problem = await Problem.findOne({ id: problemId }).lean();

    res.render("pages/problem", { problem, result: {} });

  } catch (err) {
    next(err);
  }
};

exports.solveProblem = async function (req, res, next) {
  console.log('get post', req.body);
  const { problem_id: problemId } = req.params;

  const {
    mode,
    userCode,
    testCases,
  } = req.body;

  try {
    const problem = await Problem.findOne({ id: problemId }).lean();
    const vm = new VM();
    const caseResultList = [];
    let collectCaseCount = 0;
    let checkAnswerCases;

    switch (mode) {
      case "testcase": {
        console.log('before parse', testCases);
        checkAnswerCases = testCases;
        break;
      }
      case "answer":
      default: {
        checkAnswerCases = problem.tests;
        break;
      }
    }

    console.log(userCode, checkAnswerCases);

    checkAnswerCases.forEach((testCase, index) => {
      const testCaseResult = Object.assign(testCase);
      testCaseResult.index = index + 1;

      const script = userCode + testCase.code;
      try {
        let scriptResult = vm.run(script);
        // const answer = problem.result_type === "string"
        if (typeof scriptResult === "string") {
          scriptResult = `"${scriptResult}"`;
        }

        if (scriptResult === testCase.solution) {
          testCaseResult.isCollect = true;
          testCaseResult.msg = "테스트를 성공하였습니다.";
          collectCaseCount += 1;
        } else {
          testCaseResult.isCollect = false;
          testCaseResult.msg = `실행한 결괏값 ${scriptResult}이(가) 기댓값 ${testCase.solution}와(과) 다릅니다.`;
        }
      } catch (err) {
        testCaseResult.isCollect = false;
        testCaseResult.msg = `다음과 같은 애러가 발생하였습니다. ${err.message}`;
      }

      caseResultList.push(testCaseResult);
    });

    console.log(caseResultList);

    const result = {
      caseResultList,
      totalCaseCount: caseResultList.length,
      collectCaseCount,
    };

    console.log(result);

    res.json(result);

    // switch (mode) {
    //   case "testcase": {
    //     res.render("pages/problem", { problem, result: { testcase: caseResult } });
    //     break;
    //   }

    //   case "answer":
    //   default: {
    //     res.render("pages/problem", { problem, result: { answercase: caseResult } });
    //     break;
    //   }
    // }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};