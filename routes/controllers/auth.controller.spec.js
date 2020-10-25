const sinon = require('sinon');
const Controller = require('./auth.controller');

describe('auth controller', () => {
  let req = {};
  let res = {};
  let next;

  describe('Redirect when no problem exists', () => {
    beforeEach(() => {
      res = { redirect: sinon.spy() };
    });

    it('should redirect home', () => {
      Controller.redirectLogin(req, res, next);
      sinon.assert.calledOnce(res.redirect);
    });
  });

  describe('Display login page', () => {
    beforeEach(() => {
      res = { status: sinon.stub().returns({ render: sinon.spy() }) };
      next = sinon.spy();
    });

    it('should render login', () => {
      Controller.getLogin(req, res, next);
      sinon.assert.calledOnce(res.status().render);
    });

    it('should execute next function on server error', () => {
      res = 'spy';
      Controller.getLogin(req, res, next);
      sinon.assert.calledOnce(next);
    });
  });

  describe('Execute logout', () => {
    beforeEach(() => {
      req = {
        logout: sinon.spy(),
        session: { destroy: sinon.spy() }
      };
      res = { redirect: sinon.spy() };
    });

    it('should logout and redirect', () => {
      Controller.getLogout(req, res, next);
      sinon.assert.calledOnce(req.logout);
      sinon.assert.calledOnce(req.session.destroy);
      sinon.assert.calledOnce(res.redirect);
    });
  });
});
