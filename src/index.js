'use strict';

/**
 * Get the first item in an array.
 *
 * @param {*[]} list
 * @return {*} First item.
 */
function first(list) {
    return Array.isArray(list) ? list[0] : null;
}

/**
 * Get the tail of the array.
 *
 * @param {*[]} list
 * @return {*[]} Tail.
 */
function rest(list) {
    return Array.isArray(list) ? list.slice(1) : [];
}

/**
 * Constructs a new array by prepending the item on the list.
 *
 * @param {*} item
 * @param {*[]} list
 * @return {*[]} Original list with the item at the front.
 */
function cons(item, list) {
    return [item].concat(Array.isArray(list) ? list : []);
}

module.exports = {
    first: first,
    rest: rest,
    cons: cons
};
