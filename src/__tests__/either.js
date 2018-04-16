import test from "ava";
import { Either, Arr } from "../";

const { left, right, is, map, of, chain } = Either;

test("identity", t => {
  t.true(is(left("foo")));
  t.false(is({}));
});

test("functor", t => {
  t.snapshot(left(10) |> map(x => x + 1));
  t.snapshot(right(10) |> map(x => x + 1));
});

test("monad", t => {
  t.snapshot(left("x") |> chain(_ => left("y")));
  t.snapshot(left("x") |> chain(_ => right("y")));
  t.snapshot(right("x") |> chain(_ => left("y")));
  t.snapshot(right("x") |> chain(_ => right("y")));
});

test("traversable", t => {
  t.snapshot(right([1, 2, 3]) |> Either.sequence(Arr));
});
