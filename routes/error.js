const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('에러 라우트' ,req.locals.error);

  // res.render('error')
  // next(req.locals.error);

});

module.exports = router;
