const test = require("ava");

const { Prm } = require("..");

test("identity", t => {
  t.true(Prm.is(Promise.resolve("foo")));
  t.false(Prm.is({ then: () => {} }));
});
