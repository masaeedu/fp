import test from "ava";
import { Arr, Either } from "..";

test("identity", t => {
  t.true(Arr.is([]));
});

test("functor", t => {
  t.snapshot([1, 2, 3] |> Arr.map(x => x + 1));
});

test("applicative", t => {
  t.snapshot(Arr.of(42));
  t.snapshot(Arr.lift2(x => y => x * y)([1, 2, 3])([1, 2, 3]));
});

test("monoid", t => {
  t.snapshot(Arr.empty);
  t.snapshot(Arr.append([1, 2])([3, 4]));
});

test("monad", t => {
  t.snapshot(["hup", "hup"] |> Arr.chain(x => [x, "two"]));
});

test("foldable", t => {
  t.snapshot([1, 2, 3, 4] |> Arr.foldl(x => y => x + y)(0));
});

test("traversable", t => {
  const inputs = [
    [Either.right("foo"), Either.right("bar")],
    [Either.right("foo"), Either.left("bar")]
  ];

  for (const i of inputs) {
    t.snapshot(i |> Arr.sequence(Either));
  }
});
