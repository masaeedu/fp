const { _ } = require("@masaeedu/infix");
const test = require("ava");

const { Obj, Arr, Int, IntSum, Fn } = require("../");

const snap = t => x => t.snapshot(x);

test("identity", t => {
  t.true(Obj.is({}));
});

test("zipWith", t => {
  snap(t)(Obj.zipWith(Int.mul)({ foo: 1 })({ foo: 2, bar: 3 }));
});

test("functor", t => {
  _(Fn)({ foo: 1, bar: 2 })
    ["|>"](Obj.map(x => x + 1))
    ["|>"](snap(t))._;
});

test("monoid", t => {
  snap(t)(Obj.empty);
  snap(t)(Obj.append({ foo: "bar" })({ baz: "quux" }));
});

test("foldable", t => {
  _(Fn)({ foo: 22, bar: 20 })
    ["|>"](Obj.fold(IntSum))
    ["|>"](snap(t))._;
});

test("traversable", t => {
  _(Fn)({ foo: [1, 2, 3], bar: [5, 6, 7] })
    ["|>"](Obj.sequence(Arr))
    ["|>"](snap(t))._;
});

test("appendWith", t => {
  const a = { x: 1, y: 1, z: 1 };
  const b = { x: 1, y: 1 };
  const c = { l: 1, m: 1, n: 1 };
  t.deepEqual({ x: 2, y: 2, z: 1 }, Obj.appendWith(a => b => a + b)(a)(b));
  t.deepEqual(Obj.append(a)(c), Obj.appendWith()(a)(c));
});
