const express = require("express");
const { VM } = require("vm2");
const router = express.Router();

/* GET problems page. */
router.get("/", (req, res, next) => {
  res.render("problems", { title: "problems" });
});

router.post("/:problem_id", async (req, res, next) => {
  const { userCode } = req.body;
  const vm = new VM();
  const script = userCode + `solution(3, 6);`;

  try {
    let result = await vm.run(script);

    res.render("codeEditor", { result });
  } catch (error) {
    res.render("codeEditor", { result: error });
  }
});

module.exports = router;
