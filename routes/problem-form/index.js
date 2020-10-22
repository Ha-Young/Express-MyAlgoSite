const express = require("express");

const Problem = require("../../models/Problem");
const { MongoError } = require("../../service/error");
const validateProblemForm = require("../../service/validateProblemForm");
const serializeForm = require("../../middleware/serializeForm");

const router = express.Router();

const formBase = {
  title: "",
  difficulty_level: "",
  description: "",
  examples: [
    {
      code: "",
      answer: "",
      answer_type: "string",
    },
    {
      code: "",
      answer: "",
      answer_type: "string",
    },
  ],
  tests: [
    {
      code: "",
      answer: "",
      answer_type: "string",
    },
    {
      code: "",
      answer: "",
      answer_type: "string",
    },
    {
      code: "",
      answer: "",
      answer_type: "string",
    },
  ],
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

router.post("/create", serializeForm, saveForm, validateProblemForm, (req, res, next) => {
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
