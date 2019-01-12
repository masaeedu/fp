const { _ } = require("@masaeedu/infix");

const test = require("ava");
const { Either, Fn, GenericList } = require("../..");

const snap = t => x => t.snapshot(x);

const ArrDT = (() => {
  const Cons = head => tail => [head, ...tail];
  const Nil = [];
  const match = ({ Cons, Nil }) => arr =>
    arr.length === 0 ? Nil : Cons(arr[0])(arr.slice(1));

  return { Cons, Nil, match };
})();

const Arr = GenericList(ArrDT);

test("functor", t => {
  _(Fn)([1, 2, 3])
    ["|>"](Arr.map(x => x + 1))
    ["|>"](snap(t))._;
});

test("applicative", t => {
  snap(t)(Arr.of(42));
  snap(t)(Arr.lift2(x => y => x * y)([1, 2, 3])([1, 2, 3]));
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
