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
        return Array.isArray(list) ? list[0] : undefined;
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
 * Returns a lazy array which is limited to the given length.
 *
 * @param {Number} n
 * @param {*[]} list
 * @return {*[]}
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

/**
 * Returns a lazy array which drops the first n results.
 *
 * @param {Number} n
 * @param {*[]} list
 * @return {*[]}
 */
function drop(n, list) {
    return create(function () {
        var prevFirst;

        // I would have made this recursive if JavaScript had tail call optimisations.
        while (n-- >= 0) {
            prevFirst = first(list);
            list = rest(list);
        }

        return cons(prevFirst, list);
    });
}

/**
 * Fetches the nth result.
 *
 * @param {*[]} list
 * @param {Number} n
 * @return {*}
 */
function nth(list, n) {
    return first(drop(n, list));
}

/**
 * Realises all value in a lazy sequence. Will stop when there's nothing else
 * to resolve. Be careful, this will run forever if the sequence keeps
 * returning more lazy sequences.
 *
 * Will stop when first is undefined.
 *
 * @param {*[]} list
 * @return {*[]}
 */
function all(list) {
    var results = [];
    var cur = list;
    var head;

    while (typeof (head = first(cur)) !== 'undefined') {
        results.push(head);
        cur = rest(cur);
    }

    return results;
}

/**
 * Fetches the last item in the sequence.
 *
 * @param {*[]} list
 * @return {*}
 */
function last(list) {
    var res = all(list);
    return res[res.length - 1];
}

module.exports = {
    LazyArray: LazyArray,
    create: create,
    first: first,
    rest: rest,
    cons: cons,
    second: second,
    take: take,
    drop: drop,
    nth: nth,
    all: all,
    last: last
};
