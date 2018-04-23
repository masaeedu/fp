import test from "ava";
import * as Cont from ".";
import { Fn } from "..";

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
