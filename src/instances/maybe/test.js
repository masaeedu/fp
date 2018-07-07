import test from "ava";
import Maybe from ".";

const { Nothing, Just, match } = Maybe;

test("smoke", t => {
  t.snapshot(Just("foo"));
  t.snapshot(Nothing);
});
