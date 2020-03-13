const router = require("express").Router();
const Problem = require("../models/Problem");
const path = require("path");
const vm = require("vm");

router.get("/:id", async (req, res) => {
  // 그 아이디에 맞는 문제의 정보를 디비에서 가지고 온다.
  const problem = await Problem.findOne({ id: req.params.id });
  res.render("problem", { problem: problem });
});

router.post("/:id", async (req, res) => {
  // post 해온 코드 확인하기
  console.log(req.body);
  //테스트 코드 불러오기
  const problem = await Problem.findOne({ id: req.params.id });
  let tests = problem.tests;
  const results = tests.map(test => {
    const context = { result: null, error: null };
    vm.createContext(context); // Contextify the object.
    const code =
      req.body.solutionCode +
      "\ntry{result=" +
      test.code +
      "}catch(err){ console.log(err);\nerror=err;}";
    try {
      vm.runInContext(code, context);
      console.log(context.result);
    } catch (err) {
      console.log(err);
    }
    return { pass: test.solution == context.result, error: context.error };
  });
  console.log(results.error);
  const passAll = results.every(result => result.pass);
  console.log(passAll);
  if (passAll) {
    res.render("success", {problem,results});
  } else {
    res.render("failure",{problem,results} );
  }
  // const x = 1;

  // const context = { x: 2 };
  // vm.createContext(context); // Contextify the object.

  // const code = 'x += 40; var y = 17;';
  // // `x` and `y` are global variables in the context.
  // // Initially, x has the value 2 because that is the value of context.x.
  // vm.runInContext(code, context);

  // console.log(context.x); // 42
  // console.log(context.y); // 17

  // console.log(x); // 1; y is not defined.
  // 코드를 js로 변환.
  //solution 함수를 추출
  // 코드에 입력값을 넣어서 결과를 반환 받는다 ( 에러 또는 결과 )
  // 결과를 반환한다.
  // const problem =await Problem.findOne({ id: req.params.id });
  // res.render("problem",{problem:problem });
});
module.exports = router;
