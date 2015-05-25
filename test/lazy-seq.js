'use strict';

var assert = require('assert');
var larr = require('..');

/**
 * Creates a lazy sequence of all integers larger than n.
 *
 * @param {Number} n Starting integer.
 * @return {LazySequence}
 */
function positiveNumbers(n) {
    return larr.create(function () {
        return larr.cons(n, positiveNumbers(n + 1));
    });
}

// Using the seq functions with a LazySeq argument.
describe('lazy-seq', function () {
    var lseq;

    beforeEach(function () {
        lseq = positiveNumbers(10);
    });

    describe('first', function () {
        it('should resolve the first value', function () {
            assert.equal(larr.first(lseq), 10);
        });
    });

    describe('rest', function () {
        it('returns a lazy-seq, effectively "second"', function () {
            assert.equal(larr.first(larr.rest(lseq)), 11);
        });

        it('returns third after two rests', function () {
            assert.equal(larr.first(larr.rest(larr.rest(lseq))), 12);
        });
    });

    describe('cons', function () {
        it('creates a value/LazyArray pair when consing to an instance', function () {
            var consed = larr.cons('foo', larr.create());
            assert.equal(consed[0], 'foo');
            assert(larr.LazyArray.isLazyArray(consed[1]));
        });
    });

    describe('LazyArray', function () {
        var instance;
        function fn() {}

        beforeEach(function () {
            instance = new larr.LazyArray(fn);
        });

        it('holds the function', function () {
            assert.equal(instance.fn, fn);
        });

        it('allows you to test if something is a lazy array', function () {
            assert(larr.LazyArray.isLazyArray(instance));
        });

        it('can be created through .create()', function () {
            var n = larr.create(fn);
            assert.deepEqual(n, instance);
        });
    });
});
