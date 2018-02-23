# imtbl

_Immutable operations for JavaScript data structures_

Shamelessly copied from Clojure’s core library

## Why?

Because `{ ...obj, [key]: { ...obj[key], [key1]: f(obj[key][key1]) }}` is stupid and sometimes you don't want Immutable.js in your code.

## Random benchmark results

```
updateId               0.7 ms/op 1356 op/s
manual Object.assign   0.6 ms/op 1686 op/s
```

## Installation

```
npm i imtbl
```

## API

See more usage examples in tests

* `get(coll, k, notFound)` Returns the value mapped to `k`, `notFound` or `undefined` if `k` not present.
* `getIn(coll, ks, notFound)` Returns the value in a nested array or object, where `ks` is an array of keys. Returns `undefined` if the key is not present, or the `notFound` value if supplied.
* `assoc(coll, k, v, ...)` When applied to an object, returns a new object that contains the mapping of key(s) to val(s). When applied to an array, returns a new array that contains val at index.
* `assocIn(coll, ks, v)` Associates a value in a nested array or object, where `ks` is a sequence of keys and `v` is the new value and returns a new nested structure. If any levels do not exist, objects will be created.
* `dissoc(coll, k, ...)` Returns a new object, that does not contain a mapping for key(s).
* `conj(coll, v, ...)` Returns a new array or object with values 'added'.
* `update(coll, k, f, ...args)` 'Updates' a value in an array or an object, where `k` is a key and `f` is a function that will take the old value and any supplied `args` and return the new value, and returns a new array or object. If the key does not exist, `undefined` is passed as the old value.
* `updateIn(coll, ks, f, ...args)` 'Updates' a value in a nested array or object, where `ks` is an array of keys and `f` is a function that will take the old value and any supplied `args` and return the new value, and returns a new nested array or object. If any levels do not exist, objects will be created.
