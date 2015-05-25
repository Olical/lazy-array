'use strict';

var _ = require('lodash');
var LazyArray = require('./LazyArray');
var seq = require('./seq');

/**
 * Constructs a lazy array instance.
 *
 * @param {Function} fn Generator.
 * @return {*}
 */
function create(fn) {
    return new LazyArray(fn);
}

module.exports = _.assign({
    LazyArray: LazyArray,
    create: create
}, seq);
