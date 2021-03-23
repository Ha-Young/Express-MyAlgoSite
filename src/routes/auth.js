const AuthController = require("./controllers/auth");

module.exports = function authRouter(app) {
  app.get('/join', AuthController.viewJoin);
  app.get('/login', AuthController.viewLogin);

  app.post('/join', AuthController.join);
  app.post('/login', AuthController.login);
  app.post('/logout', AuthController.logout);
};
