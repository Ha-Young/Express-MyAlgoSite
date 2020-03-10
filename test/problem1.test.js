const  expect  = require('chai').expect;
const filltheArray = require('./problem1');

describe('두 숫자 사이에 무엇이 있을까요', function () {
  it('should pass base cases', function () {
    expect(filltheArray(1, 5)).to.eql([1, 2, 3, 4, 5]);
    expect(filltheArray(6, 8)).to.eql([6, 7, 8]);
    expect(filltheArray(2,4)).to.eql([2, 3, 4]);
    });
});
