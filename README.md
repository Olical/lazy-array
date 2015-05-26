*This is a work in progress, I'm going to [write a post on it][blog] when done.*

JavaScript lazy arrays, sort of like [Clojure's seqs][seqs]. Lazy sequences can be thought of being a bit like [a traditional list cons cell][cons-post].

```bash
# Fetch the dependencies.
npm install

# Run the tests.
npm test
```

Check the tests and source JSDoc for more information, but here's a quick example.

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
