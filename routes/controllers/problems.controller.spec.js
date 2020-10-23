const sinon = require('sinon');
const Controller = require('./problems.controller');
const Problem = require('../../models/Problem');
const User = require('../../models/User');
const { VIEWS } = require('../../constants');

describe('problems controller', () => {
  const USER = {
    github_id: 'gito',
    display_name: 'toggo',
    username: 'toggo',
    profile_url: 'http://wwww.example.com/profile',
    avatar_url: 'http://wwww.example.com/avatar',
    solutions: []
  };
  let ERROR = 'Error occured';
  let req = {};
  let res = {};
  let next;
  let expectedResult;

  describe('Redirect when no problem exists', () => {
    beforeEach(() => {
      res = { redirect: sinon.spy() };
    });

    it('should redirect home', () => {
      Controller.redirectHome(req, res, next);
      sinon.assert.calledOnce(res.redirect);
    });
  });

  describe('Display all problem list in home', () => {
    let sandbox = null;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      req = { query: {}, user: USER };
      res = { status: sinon.stub().returns({ render: sinon.spy() }) };
      next = sinon.spy();
      expectedResult = [{}, {}, {}];
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should display empty problem list', async () => {
      sandbox.stub(Problem, 'find').callsFake(() => {
        return {
          lean: sandbox.stub().callsFake(() => {
            return { exec: sandbox.stub().resolves(expectedResult) };
          })
        };
      });
      await Controller.getAllProblems(req, res, next);
      sinon.assert.calledWith(Problem.find, {});
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.status().render);
      sinon.assert.match(res.status().render.args[0][1].list, expectedResult);
    });

    it('should execute next function on server error', async () => {
      sandbox.stub(Problem, 'find').throws(ERROR);
      await Controller.getAllProblems(req, res, next);
      sinon.assert.calledOnce(next);
      sinon.assert.match(next.args[0].join(''), ERROR);
    });
  });

  describe('Display selected problem', () => {
    let sandbox = null;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      req = {
        params: { problem_id: 'id' },
        user: USER
      };
      res = { status: sinon.stub().returns({ render: sinon.spy() }) };
      next = sinon.spy();
      expectedResult = { tests: [] };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should display the target problem', async () => {
      sandbox.stub(Problem, 'findById').resolves(expectedResult);
      await Controller.getProblem(req, res, next);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.status().render);
    });

    it('should execute next function on server error', async () => {
      sandbox.stub(Problem, 'findById').throws(ERROR);
      await Controller.getProblem(req, res, next);
      sinon.assert.calledOnce(next);
    });
  });

  describe('Send custom soultion', () => {
    let sandbox = null;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      req = {
        params: { problem_id: 'id' },
        body: { user_solution: 'function solution(a) { return a; }' },
        user: USER
      };
      res = { status: sinon.stub().returns({ render: sinon.spy() }) };
      next = sinon.spy();
      expectedResult = {
        completed_users: 0,
        completed_user_ids: [],
        tests: [{ code: 'solution(1)', solution: 1 }]
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should check soultion success result', async () => {
      sandbox.stub(Problem, 'findById').resolves(expectedResult);
      sandbox.stub(Problem, 'updateOne').resolves();
      sandbox.stub(User, 'updateOne').resolves();

      await Controller.postSolution(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.status().render);
      sinon.assert.match(res.status().render.args[0][0], VIEWS.SUCCESS);
    });

    it('should check soultion failure result', async () => {
      expectedResult.tests = [{ code: 'solution(1)', solution: 2 }];

      sandbox.stub(Problem, 'findById').resolves(expectedResult);
      sandbox.stub(Problem, 'updateOne').resolves();
      sandbox.stub(User, 'updateOne').resolves();

      await Controller.postSolution(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.status().render);
      sinon.assert.match(res.status().render.args[0][0], VIEWS.FAILURE);
    });

    it('should check soultion execution error result', async () => {
      req.body = { user_solution: 'function solution() { return a; }' };

      sandbox.stub(Problem, 'findById').resolves(expectedResult);
      sandbox.stub(Problem, 'updateOne').resolves();
      sandbox.stub(User, 'updateOne').resolves();

      await Controller.postSolution(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.status().render);
      sinon.assert.match(res.status().render.args[0][0], VIEWS.FAILURE);
    });

    it('should execute next function on server error', async () => {
      sandbox.stub(Problem, 'findById').throws(ERROR);
      await Controller.postSolution(req, res, next);
      sinon.assert.calledOnce(next);
    });
  });
});
