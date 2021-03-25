const express = require("express");

const { checkNotAuthenticated, checkAuthenticated } = require("../middlewares/auth");
const { 
  renderLogin, 
  renderRegister,
  register, 
  logout,
  authenticate,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/login", checkNotAuthenticated, renderLogin);
router.get("/register", checkNotAuthenticated, renderRegister);

router.post("/login", authenticate);
router.post("/register", register);

router.delete("/logout", checkAuthenticated, logout);

module.exports = router;
