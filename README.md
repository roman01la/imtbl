# imtbl

_Immutable operations for JavaScript data structures_

Shamelessly copied from Clojure’s core library

## Why?

Because `{ ...obj, [key]: { ...obj[key], [key1]: f(obj[key][key1]) }}` is stupid and sometimes you don't want Immutable.js in your code.

## Installation

```
npm i imtbl
```

## API

See more usage examples in tests

* `get({ a: 1 }, "a", "not-found")` -> `1`
* `getIn({ a: [1] }, ["a", 0], "not-found")` -> `1`
* `assoc({}, "a", 1, "b", 2)` -> `{ a: 1, b: 2 }`
* `assocIn({}, ["a", "b"], 1)` -> `{ a: { b: 1 } }`
* `assocIn({ a: [] }, ["a", 0"], 1)` -> `{ a: [1] }`
* `dissoc({ a: 1, b: 2, c: 3 }, "a", "b")` -> `{ c: 3 }`
* `conj([], 1, 2)` -> `[1, 2]`
* `conj({}, ["a", 1])` -> `{ a: 1 }`
* `update({ a: 1 }, "a", n => n + 1)` -> `{ a: 2 }`
* `update({ a: 1 }, "a", (n, a, b) => n + a + b + 1, 3, 4)` -> `{ a: 9 }`
* `updateIn({ a: [1] }, ["a", 0], (n, a, b) => n + a + b + 1, 3, 4)` -> `{ a: [9] }`
