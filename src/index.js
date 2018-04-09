import { implement } from "./plumbing";

import * as Types from "./types";
import * as Classes from "./classes";

const { Obj, Arr, Fn } = Types;

// Nesting functors and applicatives
const nestF = ({ map: map1 }) => ({ map: map2 }) => ({
  map: Fn.compose(map1)(map2)
});

const nestA = ({ of: o1, lift2: l1 }) => ({ of: o2, lift2: l2 }) => ({
  of: Fn.compose(o1)(o2),
  lift2: Fn.compose(l1)(l2)
});

const ObjOfArr = { ...nestF(Obj)(Arr), ...nestA(Obj)(Arr) };

const implementations = {
  Iter: ["Foldable", "Apply"],
  Obj: ["Foldable"],
  Arr: ["Foldable", "Apply"]
};

const augmented =
  implementations
  |> ObjOfArr.map(k => Classes[k])
  |> Obj.pairs
  |> Arr.map(([type, classes]) => [
    type,
    classes |> Arr.fold(Fn.flip(implement))(Types[type])
  ])
  |> Obj.fromPairs;

module.exports = { ...Types, ...augmented };
