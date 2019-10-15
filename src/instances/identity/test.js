import test from "ava";
import { Identity } from "./augmented";

test("Identity", t => {
  t.is(10, Identity.map(x => x + 5)(5));
  t.is(10, Identity.lift2(a => b => a + b)(5)(5));
});
