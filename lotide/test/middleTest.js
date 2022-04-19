const { assert } = require('chai');
const assertArraysEqual = require('../assertArraysEqual')
const middle = require('../middle')


describe('#middle', () => {
  it('returns [] for middle element of [1]', () => {
    assert.deepEqual(middle([1]), []); 
  });
  it("returns [] for middle element of [1, 2]", () => {
    assert.deepEqual(middle([1, 2]), []); 
  });
  it("returns [2] for middle element of [1, 2, 3]", () => {
    assert.deepEqual(middle([1, 2, 3]), [2]); 
  });
  it("returns [3] for middle element of [1, 2, 3, 4, 5]", () => {
    assert.deepEqual(middle([1, 2, 3, 4, 5]), [3]); 
  });
  it("returns [2, 3] for middle element of [1, 2, 3, 4]", () => {
    assert.deepEqual(middle([1, 2, 3, 4]), [2, 3]); 
  });
  it("returns [3, 4] for middle element of [1, 2, 3, 4, 5, 6]", () => {
    assert.deepEqual(middle([1, 2, 3, 4, 5, 6]), [3, 4]); 
  });

});
