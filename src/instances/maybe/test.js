import test from "ava";
import { Maybe, Arr } from "..";

const { Nothing, Just, match, map, of, chain } = Maybe;

test("smoke", t => {
  t.snapshot(Just("foo"));
  t.snapshot(Nothing);
});

test("functor", t => {
  t.snapshot(Nothing |> map(x => x + 1));
  t.snapshot(Just(10) |> map(x => x + 1));
});

test("monad", t => {
  t.snapshot(Nothing |> chain(_ => Nothing));
  t.snapshot(Nothing |> chain(_ => Just("y")));
  t.snapshot(Just("x") |> chain(_ => Nothing));
  t.snapshot(Just("x") |> chain(_ => Just("y")));
});

test("traversable", t => {
  t.snapshot(Just([1, 2, 3]) |> Maybe.sequence(Arr));
  t.snapshot(Nothing |> Maybe.sequence(Arr));
});

test("bifunctor", t => {
  t.snapshot(Just(41) |> Maybe.lmap(x => x + 1));
  t.snapshot(Just(41) |> Maybe.rmap(x => x + 1));
  t.snapshot(Nothing |> Maybe.lmap(x => x + 1));
  t.snapshot(Nothing |> Maybe.lmap(x => x + 1));
});
