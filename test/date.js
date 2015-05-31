'use strict';

var assert = require('assert');
var larr = require('..');

// Amount of milliseconds in a day.
var DAY = 86400000;

/**
 * Creates an infinite lazy array of all possible times using a given start
 * date and step timestamp. Providing a negative step will make it go
 * backwards.
 *
 * @param {Date} now
 * @param {Number} step
 */
function dates(now, step) {
    return larr.create(function () {
        var next = new Date(now.getTime() + step);
        return larr.cons(now, dates(next, step));
    });
}

describe('date', function () {
    var start = new Date('1994 Jan 27');
    var d;

    beforeEach(function () {
        d = dates(start, DAY);
    });

    it('should have the start date as the first value', function () {
        assert.strictEqual(larr.first(d).getTime(), start.getTime());
    });

    it('should allow me to skip forward some days', function () {
        var future = larr.nth(d, 3);
        assert.strictEqual(future.getTime(), new Date('1994 Jan 30').getTime());
    });

    it('should allow me to map a sequence of dates to strings', function () {
        function str(date) {
            return date.toDateString();
        }

        var days = larr.all(larr.map(str, larr.take(3, d)));
        var expected = [
            'Thu Jan 27 1994',
            'Fri Jan 28 1994',
            'Sat Jan 29 1994'
        ];

        assert.deepEqual(days, expected);
    });
});
