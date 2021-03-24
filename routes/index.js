const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("../middleware/checkLogin");
const { User } = require("../models/User");
const { Problem } = require("../models/Problem");
const sampleList = require("../models/sample_problems");

/* GET home page. */
router.get("/", isLoggedIn, async (req, res, next) => {
  // sample 넣는 부분
  // for (const sample of sampleList) {
  //   const title = sample.title;
  //   const description = sample.description;
  //   const difficulty = sample.difficulty_level;
  //   const tests = sample.tests;
  //   const argument = sample.argument;
  //   const completedCount = 0;
  //   const completedUsers = [];

  //   await Problem.create({
  //     title,
  //     description,
  //     difficulty,
  //     tests,
  //     argument,
  //     completedCount,
  //     completedUsers,
  //   });
  // }
  // res.render("partials/footer");
  // sample 넣는 부분

  try {
    const problemList = await Problem.find().lean();
    res.render("index", { data: problemList });
  } catch (err) {
    res.render("index");
  }
});

router.get("/login", isNotLoggedIn, async (req, res, next) => {
  res.render("login");
});

router.post(
  "/login",
  isNotLoggedIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/register", isNotLoggedIn, (req, res, next) => {
  res.render("register", { message: req.session.userExist });
  req.session.userExist = null;
});

router.post("/register", isNotLoggedIn, async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      req.session.userExist = "이미 존재하는 이메일입니다.";
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      rating: 0,
      solvedProblems: [],
    });

    res.redirect("/login");
  } catch (err) {
    next(err);
  }
});

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/level/:level", isLoggedIn, async (req, res, next) => {
  try {
    const level = parseInt(req.params.level);
    const currentLevelProblems = await Problem.find({
      difficulty: level,
    }).lean();

    res.render("index", { data: currentLevelProblems });
  } catch (err) {
    next(err);
  }
});

router.get("/solved", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      const currentUser = await User.findById(req.user._id).lean();
      const solvedProblems = currentUser.solvedProblems;
      const solvedList = [];

      for (const problemId of solvedProblems) {
        const problem = await Problem.findById(problemId).lean();
        solvedList.push(problem);
      }
      console.log(solvedList);
      res.render("index", { data: solvedList });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/unsolved", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      const currentUser = await User.findById(req.user._id).lean();
      const allProblems = await Problem.find().lean();
      const solvedProblems = currentUser.solvedProblems.map((problemId) =>
        problemId.toString()
      );
      const unsolvedList = allProblems.filter(
        (problem) => solvedProblems.indexOf(problem._id.toString()) === -1
      );
      console.log(unsolvedList);
      res.render("index", { data: unsolvedList });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
