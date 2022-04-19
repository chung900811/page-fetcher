const { assert } = require('chai');
const assertEqual = require('../assertEqual')
const assertArraysEqual = require('../assertArraysEqual')
const tail = require('../tail')

const words = ["Terry", "Lighthouse", "Labs"];

describe('#tail', () => {
  it('returns ["Lighthouse", "Labs"] for ["Terry", "Lighthouse", "Labs"] ', () => {
    assert.deepEqual(tail(words), ['Lighthouse', 'Labs']);
})
  it('returns 3 for words.length, confirming that the original "words" array was not modified', () => {
    assert.strictEqual(words.length, 3);
});
});
