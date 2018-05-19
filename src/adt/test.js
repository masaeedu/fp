import { test } from "ava";
import { adt, _ } from "..";

test("adt works", t => {
  const { F, match } = adt({ F: [_, _] });

  t.snapshot(F(5)(10) |> match({ F: a => b => a + b }));
});

test("either adt", t => {
  const { L, R, match } = adt({ L: _, R: _ });

  t.snapshot(L(5) |> match({ L, R: x => x + 1 }));
  t.snapshot(R(5) |> match({ L, R: x => x + 1 }));
});

test("nested types", t => {
  const Bool = adt({ T, F });
  const Vld = adt({ V: [_, _] }); // Bool, a

  const { T, F } = Bool;
  const { V } = Vld;

  const inputs = [V(F)("there was a problem"), V(T)(9)];

  for (const input of inputs) {
    input
      |> Vld.match({ V: Bool.match({ F: V(F), T: x => x + 1 }) })
      |> t.snapshot;
  }
});

test("zero argument type", t => {
  const { Nothing, Just, match } = adt({ Nothing, Just: _ });

  t.snapshot(Just(10));
  t.snapshot(Nothing);
  t.snapshot(Nothing |> match({ Nothing: 0, Just: x => x * 2 }));
  t.snapshot(Just(10) |> match({ Nothing: 0, Just: x => x * 2 }));
});
