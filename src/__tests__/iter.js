import test from "ava";

import { Iter } from "../";

test("identity", t => {
  t.true(Iter.is([]));
  t.true(Iter.is(new Set()));
  t.false(Iter.is({}));
});

test("functor", t => {
  t.snapshot([1, 2, 3] |> Iter.map(x => x + 1) |> Iter.toArr);
});

test("applicative", t => {
  t.snapshot(Iter.of(42) |> Iter.toArr);
  t.snapshot(Iter.lift2(x => y => x * y)([1, 2, 3])([1, 2, 3]) |> Iter.toArr);
});

test("monad", t => {
  t.snapshot(["hup", "hup"] |> Iter.chain(x => [x, "two"]) |> Iter.toArr);
});

test("monoid", t => {
  t.snapshot(Iter.empty |> Iter.toArr);
  t.snapshot(Iter.append([1, 2])([3, 4]) |> Iter.toArr);
});

test("foldable", t => {
  t.snapshot([1, 2, 3, 4] |> Iter.fold(x => y => x + y)(0));
});

test("skip", t => {
  for (const n of [-1, 0, 3, 10, Infinity]) {
    t.snapshot([1, 2, 3, 4] |> Iter.skip(n) |> Iter.toArr);
  }
});

test("take", t => {
  for (const n of [-1, 0, 3, 10, Infinity]) {
    t.snapshot([1, 2, 3, 4] |> Iter.take(n) |> Iter.toArr);
  }
});
