const test = require("ava");
const { Fn, State } = require("..");

const snap = t => x => t.snapshot(x);

test("functor", t => {
  t.deepEqual([42, 1], State.map(x => x + 21)(State.of(21))(1));
});

test("applicative", t => {
  const f = a => b => a + b;
  const s1 = State["$>"](State.modify(x => x + 1))(21);
  t.deepEqual([42, 2], State.lift2(f)(s1)(State.of(21))(1));
});

test("monad", t => {
  const transition = State.chain(v => x => [v + x, x * -1]);
  const computations = [
    Fn.passthru(State.of(0))([transition]),
    Fn.passthru(State.of(0))([transition, transition])
  ];

  computations.map(c => snap(t)(c(1)));
});
