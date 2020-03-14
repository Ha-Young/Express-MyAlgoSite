const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.status(302).redirect('/login');
});

module.exports = router;
