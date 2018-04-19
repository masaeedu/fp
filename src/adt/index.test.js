import { test } from "ava";
import { adt, a } from ".";

test("adt works", t => {
  const { F, match } = adt({ F: [a, a] });

  t.snapshot(F(5)(10) |> match({ F: a => b => a + b }));
});

test("either adt", t => {
  const { L, R, match } = adt({ L: [a], R: [a] });

  t.snapshot(L(5) |> match({ L, R: x => x + 1 }));
  t.snapshot(R(5) |> match({ L, R: x => x + 1 }));
});

test("nested types", t => {
  const Bool = adt({ T: [], F: [] });
  const Vld = adt({ V: [a, a] }); // Bool, String

  const { T, F } = Bool;
  const { V } = Vld;

  const inputs = [Vld.V(Bool.F)("there was a problem"), Vld.V(Bool.T)(9)];

  for (const input of inputs) {
    input
      |> Vld.match({ V: Bool.match({ F: V(F), T: x => x + 1 }) })
      |> t.snapshot;
  }
});
