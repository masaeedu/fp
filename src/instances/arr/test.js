const { _ } = require("@masaeedu/infix");
const test = require("ava");

const { Fn, Arr, Either } = require("..");

const snap = t => x => t.snapshot(x);

test("identity", t => {
  t.true(Arr.is([]));
});

test("functor", t => {
  _(Fn)([1, 2, 3])
    ["|>"](Arr.map(x => x + 1))
    ["|>"](snap(t))._;
});

test("applicative", t => {
  snap(t)(Arr.of(42));
  _(Fn)([[1, 2, 3], [1, 2, 3]])
    ["|>"](Fn.uncurry(Arr.lift2(x => y => x * y)))
    ["|>"](snap(t))._;
});

test("monoid", t => {
  snap(t)(Arr.empty);
  snap(t)(Arr.append([1, 2])([3, 4]));
});

test("monad", t => {
  _(Fn)(["hup", "hup"])
    ["|>"](Arr.chain(x => [x, "two"]))
    ["|>"](snap(t))._;
});

test("foldable", t => {
  _(Fn)([1, 2, 3, 4])
    ["|>"](Arr.foldl(x => y => x + y)(0))
    ["|>"](snap(t))._;
});

test("traversable", t => {
  const inputs = [
    [Either.Right("foo"), Either.Right("bar")],
    [Either.Right("foo"), Either.Left("bar")]
  ];

  for (const i of inputs) {
    snap(t)(Arr.sequence(Either)(i));
  }
});
