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
