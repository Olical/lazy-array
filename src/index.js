'use strict';

var LazyArray = require('./LazyArray');

/**
 * Get the first item in an array.
 *
 * @param {*[]} list
 * @return {*} First item.
 */
function first(list) {
    if (LazyArray.isLazyArray(list)) {
        return list.fn()[0];
    }
    else {
        return Array.isArray(list) ? list[0] : null;
    }
}

/**
 * Get the tail of the array.
 *
 * @param {*[]} list
 * @return {*[]} Tail.
 */
function rest(list) {
    if (LazyArray.isLazyArray(list)) {
        return list.fn()[1];
    }
    else {
        return Array.isArray(list) ? list.slice(1) : [];
    }
}

/**
 * Constructs a new array by prepending the item on the list. When given a
 * LazyArray instance to cons onto, it will return a value/LazyArray pair.
 *
 * @param {*} item
 * @param {*[]} list
 * @return {*[]} Original list with the item at the front.
 */
function cons(item, list) {
    if (LazyArray.isLazyArray(list)) {
        return [item, list];
    }
    else {
        return [item].concat(Array.isArray(list) ? list : []);
    }
}

/**
 * Constructs a lazy array instance.
 *
 * @param {Function} fn Generator.
 * @return {*}
 */
function create(fn) {
    return new LazyArray(fn);
}

module.exports = {
    first: first,
    rest: rest,
    cons: cons,
    LazyArray: LazyArray,
    create: create
};
