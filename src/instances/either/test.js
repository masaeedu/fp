const { _ } = require("@masaeedu/infix");
const test = require("ava");

const { Either, Arr, Fn } = require("..");

const { Left, Right, is, map, of, chain } = Either;

const snap = t => x => t.snapshot(x);

test("functor", t => {
  _(Fn)(Left(10))
    ["|>"](map(x => x + 1))
    ["|>"](snap(t))._;

  _(Fn)(Right(10))
    ["|>"](map(x => x + 1))
    ["|>"](snap(t))._;
});

test("apply", t => {
  const f = a => b => a + b;
  t.deepEqual(Right(42), Either.lift2(f)(Right(21))(Right(21)));
  t.deepEqual(Left("left"), Either.lift2(f)(Left("left"))(Right(21)));
  t.deepEqual(Right(42), Either.ap(Either.map(f)(Right(21)))(Right(21)));
});

test("monad", t => {
  _(Fn)(Left("x"))
    ["|>"](chain(_ => Left("y")))
    ["|>"](snap(t))._;

  _(Fn)(Left("x"))
    ["|>"](chain(_ => Right("y")))
    ["|>"](snap(t))._;

  _(Fn)(Right("x"))
    ["|>"](chain(_ => Left("y")))
    ["|>"](snap(t))._;

  _(Fn)(Right("x"))
    ["|>"](chain(_ => Right("y")))
    ["|>"](snap(t))._;
});

test("traversable", t => {
  _(Fn)(Right([1, 2, 3]))
    ["|>"](Either.sequence(Arr))
    ["|>"](snap(t))._;
});

test("bifunctor", t => {
  const input = Right(41);

  _(Fn)(input)
    ["|>"](Either.lmap(x => x + 1))
    ["|>"](snap(t))._;

  _(Fn)(input)
    ["|>"](Either.rmap(x => x + 1))
    ["|>"](snap(t))._;
});
