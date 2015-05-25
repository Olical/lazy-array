'use strict';

var assert = require('assert');
var larr = require('..');
var positiveNumbers = require('./utils/positiveNumbers');

// Operating on a lazy sequence using the higher level methods that depend on
// the base seq API: first, rest and cons.
describe('seq-more', function () {
    var lseq;

    beforeEach(function () {
        lseq = positiveNumbers(10);
    });

    describe('second', function () {
        it('fetches the second result', function () {
            assert.equal(larr.second(lseq), 11);
        });
    });

    describe('nth', function () {
        it('fetches the nth result', function () {
            assert.equal(larr.nth(lseq, 20), 30);
        });
    });

    describe('take', function () {
        it('returns a lazy array with the length capped', function () {
            var t = larr.take(10, lseq);
            assert.equal(larr.nth(t, 5), 15);
            assert.equal(larr.nth(t, 10), 20);
            assert.equal(larr.nth(t, 11), null);
        });
    });
});
