'use strict';

var larr = require('../..');

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

module.exports = positiveNumbers;
