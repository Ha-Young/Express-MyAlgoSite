const express = require('express');
const { mainController, loginController, postLoginController, getGoogleController, getGoogleCallbackController } = require('../controllers/login.controller');
const { joinController, postJoinController } = require("../controllers/join.controller");
const { redirectToHome } = require('../middlewares');
const router = express.Router();

/* GET home page. */
router.get('/', mainController);

router.get('/login', loginController);
router.post('/login', postLoginController);
router.get('/login/google', getGoogleController);
router.get('/login/google/callback', getGoogleCallbackController, redirectToHome);

router.get('/check', (req, res, next) => {
  console.log(req.user);
});

router.get('/join', joinController);
router.post('/join', postJoinController);

module.exports = router;
