const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('로그아웃할때 지나감....');
    req.logout();
    req.session.destroy();
    res.status(302).redirect('/login');
});

module.exports = router;
