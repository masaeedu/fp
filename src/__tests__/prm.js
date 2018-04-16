import test from "ava";

import { Prm } from "../";

test("identity", t => {
  t.true(Prm.is(Promise.resolve("foo")));
  t.false(Prm.is({ then: () => {} }));
});
