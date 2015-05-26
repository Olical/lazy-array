'use strict';

var LazyArray = require('./LazyArray');

/**
 * Constructs a lazy array instance.
 *
 * @param {Function} fn Generator.
 * @return {*}
 */
function create(fn) {
    return new LazyArray(fn);
}
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
 * Fetches the second head.
 *
 * @param {*[]} list
 * @return {*} Second item.
 */
function second(list) {
    return first(rest(list));
}

/**
 * Fetches the nth result.
 *
 * @param {*[]} list
 * @param {Number} n
 * @return {*}
 */
function nth(list, n) {
    var cur = list;

    // I would have made this recursive if JavaScript had tail call optimisations.
    for (var i = 0; i < n; i++) {
        cur = rest(cur);
    }

    return first(cur);
}

/**
 * Returns a lazy array which is limited to the given length.
 */
function take(n, list) {
    return create(function () {
        if (n >= 0) {
            return cons(first(list), take(n - 1, rest(list)));
        }
        else {
            return [];
        }
    });
}

module.exports = {
    LazyArray: LazyArray,
    create: create,
    first: first,
    rest: rest,
    cons: cons,
    second: second,
    nth: nth,
    take: take
};
