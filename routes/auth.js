const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('gitHub', (req, res, next) => {
  //there should be a condition 
  //if user was not logged then rendr login
  //if user logged in then user can see different page
  res.redirect('login');
});

module.exports = router;
