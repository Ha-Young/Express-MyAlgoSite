const sinon = require("sinon");
const { expect } = require("chai");

const problemContorller = require("../routes/controllers/problemController");
const Problem = require("../models/Problem");

describe(">>>PROBLEM CONTROLLER --- EXPRESS", () => {
  const mockProblems = [
    {
      id: 1,
      title: "1번 문제",
      difficultyLevel: 1,
    },
    {
      id: 2,
      title: "2번 문제",
      difficultyLevel: 2,
    },
    {
      id: 3,
      title: "3번 문제",
      difficultyLevel: 2,
    },
  ];

  context("+++ get problems", () => {
    afterEach(() => {
      Problem.find.restore();
    });

    it("getAllProblems_성공", async () => {
      const res = { locals: {}};
      const next = sinon.spy(() => {});

      sinon.stub(Problem, "find").resolves(mockProblems);

      await problemContorller.getAllProblems(null, res, next);

      expect(res.locals.problems).to.eql(mockProblems);
      sinon.assert.calledOnce(next);
    });

    it("getProblems_성공", async () => {
      const res = { locals: {}};
      const req = { params: { level: 2 }};
      const next = sinon.spy(() => {});
      const callbackData = [{
        id: 2,
        title: "2번 문제",
        difficultyLevel: 2,
      },
      {
        id: 3,
        title: "3번 문제",
        difficultyLevel: 2,
      }];
      const find = sinon.stub(Problem, "find").resolves(callbackData);

      await problemContorller.getProblems(req, res, next);

      expect(res.locals.problems).to.eql(callbackData);
      sinon.assert.calledWith(find, { difficultyLevel: req.params.level });
      sinon.assert.calledOnce(next);
    });
  });
});
