const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
// const CodeMirror = require('codemirror');
// let cm = new CodeMirror.fromTextArea(document.findElementById("editor"), { lineNumbers: true });


router.get('/', (req, res, next) => {
  if (Object.keys(req.session).length === 1) {
    res.render('login', { hasLoggedIn: false })
  } else {
    if (Object.keys(req.session.passport).length) {
      Problem.find({}, (err, problems) =>{
        res.render('index', { hasLoggedIn: true, problems: problems });
      });
    } else {
      res.render('login', { hasLoggedIn: false })
    }
  }
});

module.exports = router;

