import test from "ava";
import * as Obj from ".";

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

test("traversable", t => {
  t.snapshot({ foo: [1, 2, 3], bar: [5, 6, 7] } |> Obj.sequence(Arr));
});
