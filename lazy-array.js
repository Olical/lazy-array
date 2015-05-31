'use strict';

(function(define) {
    define(function () {
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
                if (n >= 1) {
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
         * Realises all value in a lazy sequence. Will stop when there's
         * nothing else to resolve. Be careful, this will run forever if the
         * sequence keeps returning more lazy sequences.
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

        /**
         * Maps the list over a function.
         *
         * @param {Function} fn
         * @param {*[]} list
         * @return {*[]}
         */
        function map(fn, list) {
            return create(function () {
                var head = first(list);

                if (typeof head !== 'undefined') {
                    return cons(fn(head), map(fn, rest(list)));
                }
                else {
                    return [];
                }
            });
        }

        /**
         * Filters out values that do not pass a predicate function.
         *
         * @param {Function} fn
         * @param {*[]} list
         * @return {*[]}
         */
        function filter(fn, list) {
            return create(function () {
                var head = first(list);
                var tail = rest(list);

                if (typeof head !== 'undefined') {
                    if (fn(head)) {
                        return cons(head, filter(fn, tail));
                    }
                    else {
                        return cons(first(tail), filter(fn, rest(tail)));
                    }
                }
                else {
                    return [];
                }
            });
        }

        /**
         * Reduces a sequence down to a single value using a function.
         *
         * @param {Function} fn
         * @param {*[]} list
         * @return {*[]}
         */
        function reduce(fn, init, list) {
            var result = init;
            var cur = list;
            var head;

            while (typeof (head = first(cur)) !== 'undefined') {
                result = fn(result, head);
                cur = rest(cur);
            }

            return result;
        }

        return {
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
            last: last,
            map: map,
            filter: filter,
            reduce: reduce
        };
    });
}(typeof module === 'object' && typeof define !== 'function'
    ? function (factory) {
        module.exports = factory(require, exports, module);
    } : define
));
