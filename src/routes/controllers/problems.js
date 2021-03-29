const { VM } = require("vm2");
const marked = require("marked");

const Problem = require("../../models/Problem");

exports.viewProblem = async function (req, res, next) {
  const { problem_id: problemId } = req.params;
  const isAdmin = req.user.isAdmin || false;

  try {
    const problem = await Problem.findOne({ _id: problemId }).lean();

    res.render("pages/problem", { problem, result: {}, isAdmin });

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
    const problem = await Problem.findOne({ _id: problemId }).lean();

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

exports.viewCreateProblem = function (req, res, next) {
  res.render("pages/problemCreate");
};

exports.createProblem = async function (req, res, next) {
  const {
    title,
    difficulty_level,
    description,
    testcase,
    argument,
    result_type,
  } = req.body;

  const tests = convertTestCaseStrToList(testcase);

  try {
    const newProblem = await Problem.create({
      title,
      difficulty_level: Number(difficulty_level),
      description: marked(description),
      tests,
      argument,
      result_type,
      completed_users: 0,
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.deleteProblem = async function (req, res, next) {
  const { problem_id: problemId } = req.params;

  console.log('hi');

  try {
    await Problem.findByIdAndDelete(problemId);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

function convertTestCaseStrToList(testCaseStr) {
  const testCaseStrList = testCaseStr.split("\n");

  return testCaseStrList.map(str => {
    const [code, solution] = str.split(":");

    if (!code || !solution) {
      return null;
    }

    return {
      code: code.trim(),
      solution: getValueOfType(solution),
    };
  });
}

function getValueOfType(solution) {
  return solution.indexOf('"') > -1
    ? solution.trim()
    : JSON.parse(solution);
}
