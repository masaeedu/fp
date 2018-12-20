import test from "ava";
import { Either, Arr } from "..";

const { Left, Right, is, map, of, chain } = Either;

test("functor", t => {
  t.snapshot(Left(10) |> map(x => x + 1));
  t.snapshot(Right(10) |> map(x => x + 1));
});

test("monad", t => {
  t.snapshot(Left("x") |> chain(_ => Left("y")));
  t.snapshot(Left("x") |> chain(_ => Right("y")));
  t.snapshot(Right("x") |> chain(_ => Left("y")));
  t.snapshot(Right("x") |> chain(_ => Right("y")));
});

test("traversable", t => {
  t.snapshot(Right([1, 2, 3]) |> Either.sequence(Arr));
});

test("bifunctor", t => {
  const input = Right(41);
  t.snapshot(input |> Either.lmap(x => x + 1));
  t.snapshot(input |> Either.rmap(x => x + 1));
});
