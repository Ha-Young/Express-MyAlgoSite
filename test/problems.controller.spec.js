const sinon = require("sinon");
const Controller = require("../controller/problems.controller");
const Problem = require("../models/Problem");

describe("Problems Controller", function () {
  const req = {
    params: {
      problem_id: "6059cff95983083e8e905a86",
    }
  }

  const error = new Error({ error: "Boom Boom" });

  beforeEach(function () {
    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ end: sinon.spy() })
    };
  });

  it("should return status 400 on server error", sinon.test(function () {
    this.stub(Problem, "findOne").yields(error);
    sinon.assert.calledOnce(Problem.findOne);
    sinon.calledWith(res.status, 400);
    sinon.calledOnce(res.status(400).end);
  }));

});
