/* eslint-disable no-unused-vars */
const express = require("express");

const Problem = require("../../models/Problem");
const { MongoError } = require("../../service/error");
const validateProblemForm = require("../../service/validateProblemForm");

const router = express.Router();

const formBase = {
  title: "",
  difficulty_level: "",
  description: "",
  example_code1: "",
  example_answer1: "",
  example_answer1_type: "",
  example_code2: "",
  example_answer2: "",
  example_answer2_type: "",
  test_arguments1: "",
  test_result1: "",
  test_result1_type: "",
  test_arguments2: "",
  test_result2: "",
  test_result2_type: "",
};

router.get("/", (req, res, next) => {
  const form = req.cookies.form && JSON.parse(req.cookies.form);

  res.render("problem-form", {
    form: form || formBase,
  });
});

async function saveForm(req, res, next) {
  const jsoned = JSON.stringify(req.body);
  await res.cookie("form", jsoned);
  next();
}

router.post("/create", saveForm, validateProblemForm, (req, res, next) => {
  const problemId = req.query.problemId;

  if (problemId) {
    Problem.findOneAndUpdate({ _id: problemId }, req.body, { upsert: true }, (err, result) => {
      if (err) next(new MongoError());

      res.clearCookie("form");
      res.render("created-form");
    });
  } else {
    Problem.create(req.body, (err, result) => {
      if (err) next(new MongoError());

      res.clearCookie("form");
      res.render("created-form");
    });
  }
});

module.exports = router;
