const AuthController = require("../controllers/auth");

module.exports = function authRouter(app) {
  app.get('/sign', AuthController.viewJoin);
  app.get('/login', AuthController.viewLogin);

  app.post('/sign', AuthController.join);
  app.post('/login', AuthController.login);
};
