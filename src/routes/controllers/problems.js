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
  const { problem_id: problemId } = req.params;

  const {
    mode,
    userCode,
    testCases,
  } = req.body;

  try {
    const problem = await Problem.findOne({ id: problemId }).lean();

    const caseResultList = [];
    let collectCaseCount = 0;
    let checkAnswerCases;

    switch (mode) {
      case "testcase": {
        checkAnswerCases = testCases;
        break;
      }
      case "answer":
      default: {
        checkAnswerCases = problem.tests;
        break;
      }
    }

    console.log(checkAnswerCases);

    checkAnswerCases.forEach((testCase, index) => {
      if (!testCase) {
        return;
      }

      const outputs = [];
      const vm = new VM({
        sandbox: {
          outputs,
        },
      });

      vm.run('console.log = (msg) => { outputs.push(msg) }');

      const testCaseResult = Object.assign(testCase);
      testCaseResult.index = index + 1;

      const script = userCode + testCase.code;

      try {
        let startTime = new Date();
        let scriptResult = vm.run(script);
        let endTime = new Date();

        const excutionTime = String(endTime - startTime);

        testCaseResult.outputs = outputs;

        if (typeof scriptResult === "string") {
          scriptResult = `"${scriptResult}"`;
        }

        if (scriptResult === testCase.solution) {
          testCaseResult.isCollect = true;
          testCaseResult.msg = "테스트를 성공하였습니다.";
          testCaseResult.summary = `성공 (${excutionTime}ms)`;
          collectCaseCount += 1;
        } else {
          testCaseResult.isCollect = false;
          testCaseResult.msg = `실행한 결괏값 ${scriptResult}이(가) 기댓값 ${testCase.solution}와(과) 다릅니다.`;
          testCaseResult.summary = `실패 (${excutionTime}ms)`;
        }
      } catch (err) {
        testCaseResult.isCollect = false;
        testCaseResult.msg = `다음과 같은 애러가 발생하였습니다. ${err.message}`;
        testCaseResult.summary = `실패 (런타임 애러)`;
      }

      caseResultList.push(testCaseResult);
    });

    const result = {
      caseResultList,
      totalCaseCount: caseResultList.length,
      collectCaseCount,
    };

    res.json(result);

  } catch (err) {
    return next(err);
  }
};
