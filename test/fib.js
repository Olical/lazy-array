'use strict';

var assert = require('assert');
var larr = require('..');

/**
 * Creates a lazy array that generates the Fibonacci sequence. Requires you to
 * pass in the initial numbers, probably 1 and 1.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {LazyArray}
 */
function fib(a, b) {
    return larr.create(function () {
        return larr.cons(a, fib(b, a + b));
    });
}

describe('fib', function () {
    var f;

    beforeEach(function () {
        f = fib(1, 1);
    });

    it('should provide the 50th number in the sequence', function () {
        // Actually at index 49 since nth is zero indexed.
        var fib50 = 12586269025;
        assert.strictEqual(larr.nth(f, 49), fib50);
    });

    it('should provide the 10th to the 20th', function () {
        // Actually drop 9 and take 11 to get this result.
        var fib10to20 = [
            55,
            89,
            144,
            233,
            377,
            610,
            987,
            1597,
            2584,
            4181,
            6765
        ];

        var actual = larr.all(larr.take(11, larr.drop(9, f)));
        assert.deepEqual(actual, fib10to20);
    });
});
