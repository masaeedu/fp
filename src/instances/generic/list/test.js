import test from "ava";
import { Either } from "../..";
import GenericList from ".";

const ArrDT = (() => {
  const Cons = head => tail => [head, ...tail];
  const Nil = [];
  const match = ({ Cons, Nil }) => arr =>
    arr.length === 0 ? Nil : Cons(arr[0])(arr.slice(1));

  return { Cons, Nil, match };
})();

const Arr = GenericList(ArrDT);

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
    [Either.Right("foo"), Either.Right("bar")],
    [Either.Right("foo"), Either.Left("bar")]
  ];

  for (const i of inputs) {
    t.snapshot(i |> Arr.sequence(Either));
  }
});
