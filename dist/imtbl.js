(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.imtbl = {})));
}(this, (function (exports) { 'use strict';

const isObject = v =>
  v !== null && typeof v === "object" && Array.isArray(v) === false;

const isNil = v => v === undefined || v === null;

const assoc = (coll, ...kvs) => {
  let ret = coll;

  for (let idx = 0; idx < kvs.length; idx += 2) {
    const k = kvs[idx];
    const v = kvs[idx + 1];

    if (Array.isArray(ret)) {
      const tmp = ret.slice();
      tmp[k] = v;
      ret = tmp;
    }

    if (isObject(ret)) {
      ret = Object.assign({}, ret, { [k]: v });
    }
  }

  return ret;
};

const assocIn = (m, [k, ...ks], v) =>
  ks.length > 0 ? assoc(m, k, assocIn(get(m, k, {}), ks, v)) : assoc(m, k, v);

const dissoc = (m, ...ks) => {
  let ret = m;

  for (let idx = 0; idx < ks.length; idx++) {
    const k = ks[idx];
    ret = Object.assign({}, ret);
    delete ret[k];
  }

  return ret;
};

const update = (m, k, f, ...args) => assoc(m, k, f(get(m, k), ...args));

const updateIn = (m, ks, f, ...args) => {
  const up = (m, [k, ...ks], f, args) =>
    ks.length > 0
      ? assoc(m, k, up(get(m, k, {}), ks, f, args))
      : assoc(m, k, f(get(m, k), ...args));
  return up(m, ks, f, args);
};

const conj = (coll, ...xs) => {
  let ret = coll;

  for (let idx = 0; idx < xs.length; idx++) {
    const x = xs[idx];

    if (Array.isArray(ret)) {
      ret = ret.concat(x);
    }

    if (isObject(ret)) {
      const [k, v] = x;
      ret = assoc(ret, k, v);
    }
  }

  return ret;
};

const get = (m, k, notFound) => (isNil(m[k]) ? notFound : m[k]);

const getIn = (m, ks, notFound) => {
  let ret = m;

  for (let idx = 0; idx < ks.length; idx++) {
    const k = ks[idx];
    const tmp = get(ret, k);

    if (tmp === undefined) {
      return notFound;
    }

    ret = tmp;
  }
  return ret;
};

exports.assoc = assoc;
exports.assocIn = assocIn;
exports.dissoc = dissoc;
exports.update = update;
exports.updateIn = updateIn;
exports.conj = conj;
exports.get = get;
exports.getIn = getIn;

Object.defineProperty(exports, '__esModule', { value: true });

})));
