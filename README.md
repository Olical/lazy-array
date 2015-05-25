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

var seq = ['foo', 'bar', 'baz'];

larr.first(seq); // 'foo'
larr.rest(seq); // ['bar', 'baz'];
larr.cons('pre', seq); // ['pre', 'foo', 'bar', 'baz']
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
