import test from "ava";
import { State } from "../";

test("monad", t => {
  const transition = State.chain(v => x => [v + x, x * -1]);
  t.snapshot(1 |> (State.of(0) |> transition));
  t.snapshot(1 |> (State.of(0) |> transition |> transition));
});
