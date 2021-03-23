const passportLoader = require("./passportLoader/index").loger;
const mongooseLoader = require("./mongooseLoader/index").loger;

module.exports = {
  loger: (app) => {
    passportLoader(app);
    mongooseLoader();
  }
};
