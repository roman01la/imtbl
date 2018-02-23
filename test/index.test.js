const {
  assoc,
  assocIn,
  dissoc,
  get,
  getIn,
  update,
  updateIn,
  conj
} = require("../dist/imtbl");

test("get", () => {
  expect(get({ a: 1 }, "a")).toEqual(1);
  expect(get({ a: 1 }, "v")).toEqual(undefined);
  expect(get({ a: 1 }, "v", 0)).toEqual(0);

  expect(get([1, 2, 3], 1)).toEqual(2);
  expect(get([1, 2, 3], 3)).toEqual(undefined);
  expect(get([1, 2, 3], 3, 0)).toEqual(0);
});

test("getIn", () => {
  expect(getIn({ a: { b: 1 } }, ["a", "b"])).toEqual(1);
  expect(getIn({ a: { b: 1 } }, ["a", "b", "l"])).toEqual(undefined);
  expect(getIn({ a: { b: 1 } }, ["a", "g"], 0)).toEqual(0);

  expect(getIn([1, [2]], [1, 0])).toEqual(2);
  expect(getIn([1, [2]], [0, 1, 2])).toEqual(undefined);
  expect(getIn([1, [2]], [0, 1, 2], 0)).toEqual(0);

  expect(getIn({ a: { b: [, 2] } }, ["a", "b", 1])).toEqual(2);
  expect(getIn({ a: { b: [, 2] } }, ["a", "b", 0])).toEqual(undefined);
  expect(getIn({ a: { b: [, 2] } }, ["a", "b", 0], 0)).toEqual(0);
});

test("assoc", () => {
  expect(assoc({}, "a", 1)).toEqual({ a: 1 });
  expect(assoc({}, "a", 1, "b", 2)).toEqual({ a: 1, b: 2 });

  expect(assoc([], 0, 1)).toEqual([1]);
  expect(assoc([], 1, 1, 3, 2)).toEqual([, 1, , 2]);
});

test("assocIn", () => {
  expect(assocIn({ a: {} }, ["a", "b"], 1)).toEqual({ a: { b: 1 } });
  expect(assocIn({}, ["a", "b"], 1)).toEqual({ a: { b: 1 } });
  expect(assocIn({ a: 1 }, ["a", "b"], 1)).toEqual({ a: 1 });

  expect(assocIn([1, []], [1, 0], 1)).toEqual([1, [1]]);
  expect(assocIn([1, []], [1, 0, "key"], 1)).toEqual([1, [{ key: 1 }]]);
  expect(assocIn([1, []], [0, 1], 1)).toEqual([1, []]);

  expect(assocIn({ a: [] }, ["a", 0], 1)).toEqual({ a: [1] });
  expect(assocIn([{ a: [] }], [0, "a", 1], 1)).toEqual([{ a: [, 1] }]);
});

test("dissoc", () => {
  expect(dissoc({ a: 1, b: 2, c: 3 }, "a", "b", "d")).toEqual({ c: 3 });
});

test("conj", () => {
  expect(conj([], 1, 2)).toEqual([1, 2]);
  expect(conj({}, ["a", 1], ["b", 2])).toEqual({ a: 1, b: 2 });
});

test("update", () => {
  expect(update({ a: 1 }, "a", (n, x) => n + x + 1, 10)).toEqual({ a: 12 });
  expect(update({ a: 1 }, "b", (n, x) => n + x + 1, 10)).toEqual({
    a: 1,
    b: NaN
  });

  expect(update([1], 0, (n, x) => n + x + 1, 10)).toEqual([12]);
  expect(update([1], 1, (n, x) => n + x + 1, 10)).toEqual([1, NaN]);
});

test("updateIn", () => {
  expect(updateIn({ a: { b: 1 } }, ["a", "b"], n => n + 1)).toEqual({
    a: { b: 2 }
  });
  expect(updateIn({ a: { b: 1 } }, ["a", "c"], n => n + 1)).toEqual({
    a: { b: 1, c: NaN }
  });

  expect(updateIn([0, [0]], [1, 0], n => n + 1)).toEqual([0, [1]]);
  expect(updateIn([0, []], [1, 0], n => n + 1)).toEqual([0, [NaN]]);

  expect(updateIn({ a: [0] }, ["a", 0], n => n + 1)).toEqual({ a: [1] });
  expect(updateIn({ a: [0] }, ["a", 1], n => n + 1)).toEqual({ a: [0, NaN] });
});
