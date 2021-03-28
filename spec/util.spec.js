const request = require("supertest");
const { expect } = require("chai");
const getResult = require("../utils/getResult");


const userCode = "function solution(n) { return n }";
const tests = [
  {
    "code": "solution(3)",
    "solution": 2
  },
  {
    "code": "solution(2)",
    "solution": 1
  },
  {
    "code": "solution(1)",
    "solution": 1
  }
];

const solutionResult = getResult(userCode, tests);

describe("get result function", () => {
  it("should return object", () => {
    expect(typeof solutionResult).to.eql("object");
  });

  it("should return solution result", () => {
    const resultList = [
      { testResult: 3, expectedResult: 2, isPassed: false },
      { testResult: 2, expectedResult: 1, isPassed: false },
      { testResult: 1, expectedResult: 1, isPassed: true }
    ];

    expect(solutionResult).to.eql({
      isAllPassed: false,
      resultList,
      solutionError: false,
    });
  });
});
