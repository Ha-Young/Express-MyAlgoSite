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
    } catch (err) {
    }
    return { pass: test.solution == context.result, error: context.error };
  });
  const passAll = results.every(result => result.pass);
  if (passAll) {
    res.render("success", {problem,results});
  } else {
    res.render("failure",{problem,results} );
  }

});
module.exports = router;
