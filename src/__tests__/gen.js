import test from "ava";

import { Gen } from "../";

test("identity", t => {
  t.true(Gen.is([]));
  t.true(Gen.is(new Set()));
});

test("functor", t => {
  t.snapshot([1, 2, 3] |> Gen.map(x => x + 1) |> Gen.toArr);
});

test("applicative", t => {
  t.snapshot(Gen.of(42) |> Gen.toArr);
  t.snapshot(Gen.lift2(x => y => x * y)([1, 2, 3])([1, 2, 3]) |> Gen.toArr);
});

test("monad", t => {
  t.snapshot(["hup", "hup"] |> Gen.chain(x => [x, "two"]) |> Gen.toArr);
});

test("monoid", t => {
  t.snapshot(Gen.empty |> Gen.toArr);
  t.snapshot(Gen.append([1, 2])([3, 4]) |> Gen.toArr);
});

test("foldable", t => {
  t.snapshot([1, 2, 3, 4] |> Gen.fold(x => y => x + y)(0));
});
