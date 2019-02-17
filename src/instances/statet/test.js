const test = require("ava");
const { Fn, State } = require("..");

const snap = t => x => t.snapshot(x);

test("monad", t => {
  const transition = State.chain(v => x => [v + x, x * -1]);
  const computations = [
    Fn.passthru(State.of(0))([transition]),
    Fn.passthru(State.of(0))([transition, transition])
  ];

  computations.map(c => snap(t)(c(1)));
});
