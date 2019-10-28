const { _ } = require("@masaeedu/infix");
const { mdo } = require("@masaeedu/do");

const test = require("ava");

const { Fn, Arr } = require("..");
const { Cont } = require("./augmented");

const snap = t => x => t.snapshot(x);

test("functor", t => {
  _(Fn)(Cont.of(41))
    ["|>"](Cont.map(x => x + 1))
    ["$"](x => `Forty two in numerals is ${x}`)
    ["|>"](snap(t))._;
});

test("apply", t => {
  const f = a => b => a + b;
  t.is(42, Cont.lift2(f)(Cont.of(21))(Cont.of(21))(Fn.id));
  t.is(42, Cont.ap(Cont.map(f)(Cont.of(21)))(Cont.of(21))(Fn.id));
});

test("monad", t => {
  // Continue with 10 if the input is greater than 10
  const cap = max => Cont.chain(x => cont => (x <= max ? cont(x) : cont(max)));

  _(Fn)(Cont.of(5))
    ["|>"](cap(10))
    ["|>"](Cont.run)
    ["|>"](snap(t))._;

  _(Fn)(Cont.of(15))
    ["|>"](cap(10))
    ["|>"](Cont.run)
    ["|>"](snap(t))._;
});

test("representing other monads", t => {
  const i = M => x => cont => M.chain(cont)(x);
  const run = M => c => c(M.of);

  const result = mdo(Cont)(({ a, b }) => [
    [a, () => i(Arr)([1, 2])],
    [b, () => i(Arr)([10, 20])],
    () => Cont.of(a + b)
  ]);

  snap(t)(run(Arr)(result));
});
