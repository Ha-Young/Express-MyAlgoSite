const express = require("express");
const indexController = require("./controllers/indexController");
const router = express.Router();

router.get("/", indexController.renderIndexPage);
router.post("/", indexController.renderIndexPage);

module.exports = router;
