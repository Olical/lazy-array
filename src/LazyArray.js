'use strict';

/**
 * Function that wraps the given generator function. Will be executed upon
 * .fn().
 *
 * @class LazyArray
 * @param {Function} fn Generator.
 */
function LazyArray(fn) {
    this.fn = fn;
}

/**
 * Tests if the given value is a lazy array.
 *
 * @param {*} val
 * @return {Boolean}
 */
LazyArray.isLazyArray = function isLazyArray(val) {
    return val instanceof LazyArray;
};

module.exports = LazyArray;
