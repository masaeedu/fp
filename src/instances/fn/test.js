import test from "ava";
import { Fn, Int } from "..";

test("functor", t => {
  const result = Fn.const(10) |> Fn.map(Int.add(1));
  t.snapshot(result |> Fn.feed());
});

test("applicative", t => {
  const result = [Fn.of(20), Fn.of(22)] |> Fn.uncurry(Fn.lift2(Int.add));
  t.snapshot(result |> Fn.feed());
});
