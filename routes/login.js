const router = require('express').Router();

const {
  getLogin,
  getAuthWithGoogle,
  getAuthCallbackWithGoogle,
  getSuccessfulAuthWithGoogle,
} = require(`${__dirname}/controllers/login.controller`);

router.get("/", getLogin);
router.get("/google", getAuthWithGoogle);
router.get(
  "/google/auth-callback",
  getAuthCallbackWithGoogle,
  getSuccessfulAuthWithGoogle,
);

module.exports = router;
