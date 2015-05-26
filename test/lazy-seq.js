'use strict';

var assert = require('assert');
var larr = require('..');
var positiveNumbers = require('./utils/positiveNumbers');

// Using the seq functions with a LazySeq argument.
describe('lazy-seq', function () {
    var lseq;

    beforeEach(function () {
        lseq = positiveNumbers(10);
    });

    describe('first', function () {
        it('should resolve the first value', function () {
            assert.strictEqual(larr.first(lseq), 10);
        });
    });

    describe('rest', function () {
        it('returns a lazy-seq, effectively "second"', function () {
            assert.strictEqual(larr.first(larr.rest(lseq)), 11);
        });

        it('returns third after two rests', function () {
            assert.strictEqual(larr.first(larr.rest(larr.rest(lseq))), 12);
        });
    });

    describe('cons', function () {
        it('creates a value/LazyArray pair when consing to an instance', function () {
            var consed = larr.cons('foo', larr.create());
            assert.strictEqual(consed[0], 'foo');
            assert(larr.LazyArray.isLazyArray(consed[1]));
        });
    });

    describe('LazyArray', function () {
        var instance;
        function fn() {}

        beforeEach(function () {
            instance = new larr.LazyArray(fn);
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
