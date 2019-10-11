const { _ } = require("@masaeedu/infix");
const test = require("ava");

const { Fn, Iter, Either } = require("../");

const snap = t => x => t.snapshot(x);

test("identity", t => {
  t.true(Iter.is([]));
  t.true(Iter.is(new Set()));
  t.false(Iter.is({}));
});

test("functor", t => {
  _(Fn)([1, 2, 3])
    ["|>"](Iter.map(x => x + 1))
    ["|>"](Iter.toArr)
    ["|>"](snap(t))._;
});

test("applicative", t => {
  _(Fn)(Iter.of(42))
    ["|>"](Iter.toArr)
    ["|>"](snap(t))._;

  _(Fn)([1, 2, 3])
    ["|>"](Fn.join(Iter.lift2(x => y => x * y)))
    ["|>"](Iter.toArr)
    ["|>"](snap(t))._;
});

test("monad", t => {
  _(Fn)(["hup", "hup"])
    ["|>"](Iter.chain(x => [x, "two"]))
    ["|>"](Iter.toArr)
    ["|>"](snap(t))._;
});

test("monoid", t => {
  _(Fn)(Iter.empty)
    ["|>"](Iter.toArr)
    ["|>"](snap(t))._;

  _(Fn)(Iter.append([1, 2])([3, 4]))
    ["|>"](Iter.toArr)
    ["|>"](snap(t))._;
});

test("foldable", t => {
  _(Fn)([1, 2, 3, 4])
    ["|>"](Iter.foldl(x => y => x + y)(0))
    ["|>"](snap(t))._;
});

test("drop", t => {
  for (const n of [-1, 0, 3, 10, Infinity]) {
    _(Fn)([1, 2, 3, 4])
      ["|>"](Iter.drop(n))
      ["|>"](Iter.toArr)
      ["|>"](snap(t))._;
  }
});

test("take", t => {
  for (const n of [-1, 0, 3, 10, Infinity]) {
    _(Fn)([1, 2, 3, 4])
      ["|>"](Iter.take(n))
      ["|>"](Iter.toArr)
      ["|>"](snap(t))._;
  }
});

test("traversable", t => {
  const inputs = [
    [Either.Right("foo"), Either.Right("bar")],
    [Either.Right("foo"), Either.Left("bar")]
  ];

  for (const i of inputs) {
    snap(t)(Iter.sequence(Either)(i));
  }
});

test("transpose", t => {
  const inputs = [
    // Matrix transposition
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    // Top secret encrypted message
    ["yjltg ", "ouoha", "ussem", " tt e"]
  ];

  for (const i of inputs) {
    snap(t)(Iter.transpose(i));
  }
});

test("scanl", t => {
  _(Fn)([1, 2, 3, 4])
    ["|>"](Iter.scanl(x => y => x + y)(0))
    ["|>"](snap(t))._;

  _(Fn)([])
    ["|>"](Iter.scanl(x => y => x + y)(0))
    ["|>"](snap(t))._;
});

test("scanl1", t => {
  _(Fn)([1, 2, 3, 4])
    ["|>"](Iter.scanl1(x => y => x + y))
    ["|>"](snap(t))._;

  _(Fn)([])
    ["|>"](Iter.scanl1(x => y => x + y))
    ["|>"](snap(t))._;
});