const sinon = require('sinon');
const sinonTest = require('sinon-test')(sinon);

const User = require('../../models/User');
const Problem = require('../../models/Problem');
const {
  getProblemList,
  getLoginPage,
  doLogout
} = require('./authorization.js/index.js');

describe('Index Controller', function () {
  let req= {
    user : {
      _id: '5d845d508e4bce3c51f86382',
      profile_img_url: 'https://avatars0.githubusercontent.com/u/48800862?v=4',
      user_name: 'CyranoPark'
    }
  };
  let error = new Error({ error: 'error' });
  let res = {};
  let expectedResult;

  describe('getProblemList', function () {
    beforeEach(function () {
      res = {
        render: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() })
      };
      expectedResult = [{}, {}, {}];
    });

    it('should return loaded problem list', sinonTest(function () {
      this.stub(User, 'findOne').yields(null, expectedResult);
      this.stub(Problem, 'find').yields(null, expectedResult);
      getProblemList(req, res);
      sinon.assert.calledWith(Problem.find, {});
      sinon.assert.calledWith(res.json, sinon.match.array);
    }));
  });
});
