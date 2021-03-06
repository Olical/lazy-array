# lazy-array [![Join the chat at https://gitter.im/Wolfy87/lazy-array](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Wolfy87/lazy-array?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![npm version](https://badge.fury.io/js/lazy-array.svg)](http://badge.fury.io/js/lazy-array)

JavaScript lazy arrays, sort of like [Clojure's seqs][seqs]. Lazy sequences can be thought of being a bit like [a traditional Lisp cons cell][cons-post].

```bash
# Fetch the dependencies.
npm install

# Run the tests.
npm test
```

Check the tests and source (`lazy-array.js`) JSDoc for more information, here's a quick example.

```javascript
var larr = require('lazy-array');

var plainArray = ['foo', 'bar', 'baz'];

/**
 * Creates a lazy sequence of all integers greater or equal to n.
 *
 * @param {Number} n Starting integer.
 * @return {LazySequence}
 */
function positiveNumbers(n) {
    return larr.create(function () {
        return larr.cons(n, positiveNumbers(n + 1));
    });
}

// The functions work on plain arrays since they're all built on the core seq
// functions (cons, first and rest) which work on plain or lazy arrays.
larr.first(plainArray); // 'foo'
larr.rest(plainArray); // ['bar', 'baz'];
larr.cons('pre', plainArray); // ['pre', 'foo', 'bar', 'baz']

// Allows you to operate on infinite sequences of values which are only
// calculated when requested.
larr.nth(positiveNumbers(10), 15); // 25

// You can take sections of that sequence and evaluate it to a plain array.
var nums = positiveNumbers(1);
larr.all(larr.take(3, larr.drop(5, nums))); // [6, 7, 8]
```

The script is wrapped in a [UMD][] so you can require it with RequireJS or node.

## Unlicenced

Find the full [unlicense][] in the `UNLICENSE` file, but here's a snippet.

>This is free and unencumbered software released into the public domain.
>
>Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

Do what you want. Learn as much as you can. Unlicense more software.

[unlicense]: http://unlicense.org/
[seqs]: http://clojure.org/sequences
[blog]: http://oli.me.uk/
[cons-post]: http://theatticlight.net/posts/Lazy-Sequences-in-Clojure/
[UMD]: https://github.com/umdjs/umd
