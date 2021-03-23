const router = require("express").Router();
const { uploadProblems } = require(`${__dirname}/controllers/upload.controller.js`);

router.get("/problem", uploadProblems);

module.exports = router;