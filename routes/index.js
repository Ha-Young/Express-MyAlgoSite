const express = require('express');
const router = express.Router();
const { requiresLogin } = require("./middlewares/requiresLogin");
const Problem = require("../models/Problem");

/* GET home page. */

router.get("/", requiresLogin, async (req, res, next) => {
  const allTitle = await Problem.find().select(["title", "id"]);
  res.render('index', { allTitle: allTitle });
});

// router.get("/:difficulty_level", async(req,res, next) => {
//   console.log(req.params);
//   const level = req.params.difficulty_level;
//   const filteredTitle = await Problem.find({difficulty_level: level}).select(["title", "id"]);
//   res.render('index', { allTitle: filteredTitle });
// });



module.exports = router;
