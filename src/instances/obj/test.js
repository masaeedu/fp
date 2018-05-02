import test from "ava";
import { Obj, Arr, IntSum, Fn } from "../";

test("identity", t => {
  t.true(Obj.is({}));
});

test("functor", t => {
  t.snapshot({ foo: 1, bar: 2 } |> Obj.map(x => x + 1));
});

test("monoid", t => {
  t.snapshot(Obj.empty);
  t.snapshot(Obj.append({ foo: "bar" })({ baz: "quux" }));
});

test("foldable", t => {
  t.snapshot({ foo: 22, bar: 20 } |> Obj.foldMap(IntSum)(Fn.id));
});

test("traversable", t => {
  t.snapshot({ foo: [1, 2, 3], bar: [5, 6, 7] } |> Obj.sequence(Arr));
});
