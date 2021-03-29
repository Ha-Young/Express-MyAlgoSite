const { Router } = require("express");

const FilterController = require("./controllers/filter");
const loginCheck = require("./middlewares/loginCheck");

const route = Router();

module.exports = function filterRouter(app) {
  app.use('/filter', loginCheck, route);

  route.get("/level/:level_grade", FilterController.viewFilteredLevel);
};
