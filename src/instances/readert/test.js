const test = require("ava");
const { ReaderT, Arr } = require("..");

test("ReaderT", t => {
  const M = ReaderT(Arr);

  const input = x => [x, x];
  const result = M.map(x => x * 2)(input);

  t.snapshot(result(1));
});
