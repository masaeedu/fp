import test from "ava";
import { Meta, Arr } from "../../..";

test("ReaderT", t => {
  const M = Meta.Transformers.ReaderT(Arr);

  const input = x => [x, x];
  const result = input |> M.map(x => x * 2);

  t.snapshot(result(1));
});
