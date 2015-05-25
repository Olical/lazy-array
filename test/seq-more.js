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

    describe('take', function () {
        it('returns a lazy array with the length capped', function () {
        });
    });
});
