const { _ } = require("@masaeedu/infix");
const test = require("ava");

const { Obj, Arr, Int, IntSum, Fn, Either } = require("../");

const snap = t => x => t.snapshot(x);

test("identity", t => {
  t.true(Obj.is({}));
});

test("fromPairs", t => {
  const ps = [["foo", 1], ["bar", 2], ["baz", 3]];
  const ex = { foo: 1, bar: 2, baz: 3 };
  const r = Obj.fromPairs(ps);
  t.deepEqual(ex, r);
  t.snapshot(r);
});

test("withKey", t => {
  const o = { a: 1, b: 2, c: 3 };
  const e = Obj.zipWith(a => b => [a, b])(Obj.mirror(Obj.keys(o)))(o);
  const r = Obj.withKey(o);
  t.deepEqual(e, r);
  t.snapshot(r);
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

  const x = { foo: 10, bar: 32 };
  const f = a => b => a + b;
  t.is(42, Obj.foldr(f)(0)(x));
  t.is(42, Obj.foldMap(IntSum)(x => x)(x));
  t.is(42, Obj.foldl(f)(0)(x));
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
  const r1 = Obj.appendWith(a => b => a + b)(a)(b);
  const r2 = Obj.appendWith()(a)(c);
  t.deepEqual({ x: 2, y: 2, z: 1 }, r1);
  t.deepEqual(Obj.append(a)(c), r2);
  t.snapshot(r1, "with intersection");
  t.snapshot(r2, "disjoint");
});

test("map/traverse/foldMapWithKey", t => {
  const o = { foo: 1, bar: 2, baz: 3 };
  t.snapshot(
    Obj.traverseWithKey(Either)(k => x => Either.Right([k, x]))(o),
    "traverseWithKey"
  );
  t.snapshot(Obj.mapWithKey(k => x => [k, x])(o), "mapWithKey");
  t.snapshot(
    Obj.foldMapWithKey(Obj)(k => x => ({ [k]: [k, x] }))(o),
    "foldMapWithKey"
  );
});
