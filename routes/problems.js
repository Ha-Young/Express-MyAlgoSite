const router = require("express").Router();
const { getProblem, verifyUserCode } = require(`${__dirname}/controllers/problems.controller`);

router.get("/", (req, res, next) => res.redirect("/"));
router.get("/:problem_id", getProblem);
router.post("/:problem_id", verifyUserCode);

module.exports = router;
