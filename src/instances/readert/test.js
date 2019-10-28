const test = require("ava");
const {
  ReaderT,
  Arr,
  Fnctr: { Identity }
} = require("..");

test("ReaderT", t => {
  const M = ReaderT(Arr);

  const input = x => [x, x];
  const result = M.map(x => x * 2)(input);

  t.snapshot(result(1));
});

const Reader = ReaderT(Identity);

test("functor", t => {
  t.is(42, Reader.map(x => x + 21)(Reader.of(21))());
});

test("applicative", t => {
  const f = a => b => a + b;
  t.is(42, Reader.lift2(f)(Reader.of(21))(Reader.of(21))());
  t.is(42, Reader.ap(Reader.map(f)(Reader.of(21)))(Reader.of(21))());
});

test("monad", t => {
  const f = a => Reader.of(a + 21);
  t.is(42, Reader.chain(f)(Reader.of(21))());
});
