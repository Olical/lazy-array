'use strict';

/**
 * Function that wraps the given generator function. Will be executed upon
 * .fn().
 *
 * @class LazyArray
 * @param {Function} fn Generator.
 */
function LazyArray(fn) {
    this._fn = fn;
}

/**
 * Executes the contained function, caches the result.
 *
 * @return {*}
 */
LazyArray.prototype.fn = function () {
    if (!this.hasOwnProperty('_cache')) {
        this._cache = this._fn();
    }

    return this._cache;
};

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
