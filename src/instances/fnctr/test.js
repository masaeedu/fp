const test = require("ava");
const { Fnctr, Fn, Arr, Obj, Prm, IntProduct } = require("..");

const snap = t => x => t.snapshot(x);

const input = {
  foo: [{ bar: [10] }, [42]]
};
const T = Fnctr.Recurse([Obj, Arr]);

test("traversable", async t => {
  const result = await T.traverse(Prm)(Prm.of)(input);
  snap(t)(result);
});

test("functor", t => {
  const result = T.map(x => x * 2)(input);
  snap(t)(result);
});

test("foldable", t => {
  const result = T.foldMap(IntProduct)(Fn.id)(input);
  snap(t)(result);
});
