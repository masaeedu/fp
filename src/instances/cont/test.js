import test from "ava";
import { Fn, Arr } from "..";
import { Cont } from "./augmented";

test("functor", t => {
  const cont = Cont.of(41) |> Cont.map(x => x + 1);
  t.snapshot(cont(x => `Forty two in numerals is ${x}`));
});

test("monad", t => {
  // Continue with 10 if the input is greater than 10
  const cap = max => Cont.chain(x => cont => (x <= max ? cont(x) : cont(max)));

  t.snapshot(Cont.of(5) |> cap(10) |> Cont.run);
  t.snapshot(Cont.of(15) |> cap(10) |> Cont.run);
});

test("representing other monads", t => {
  const i = M => x => cont => M.chain(cont)(x);
  const run = M => c => c(M.of);

  const result =
    i(Arr)([1, 2])
    |> Cont.chain(a => i(Arr)([10, 20]) |> Cont.chain(b => Cont.of(a + b)));

  t.snapshot(result |> run(Arr));
});
