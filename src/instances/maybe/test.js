const { _ } = require("@masaeedu/infix");
const test = require("ava");

const { Maybe, Arr, Fn } = require("..");

const { Nothing, Just, match, map, of, chain } = Maybe;

const snap = t => x => t.snapshot(x);

test("smoke", t => {
  snap(t)(Just("foo"));
  snap(t)(Nothing);
});

test("functor", t => {
  _(Fn)(Nothing)
    ["|>"](map(x => x + 1))
    ["|>"](snap(t))._;

  _(Fn)(Just(10))
    ["|>"](map(x => x + 1))
    ["|>"](snap(t))._;
});

test("monad", t => {
  // prettier-ignore
  const inputs = [
    [Nothing, Just("x")],
    [Nothing, Just("y")]
  ];
  const outputs = Fn.uncurry(Arr.lift2(Maybe[">>"]))(inputs);

  for (const o of outputs) {
    snap(t)(o);
  }
});

test("traversable", t => {
  _(Fn)(Just([1, 2, 3]))
    ["|>"](Maybe.sequence(Arr))
    ["|>"](snap(t))._;

  _(Fn)(Nothing)
    ["|>"](Maybe.sequence(Arr))
    ["|>"](snap(t))._;
});

test("bifunctor", t => {
  const inputs = [
    [Just(41), Nothing],
    [Maybe.lmap(x => x + 1), Maybe.rmap(x => x + 1)]
  ];
  const outputs = Fn.uncurry(Arr.lift2(Fn["$"]))(inputs);

  for (const o of outputs) {
    snap(t)(o);
  }
});
