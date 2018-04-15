import { implement } from "./plumbing";

import * as Types from "./types/augmented";
import * as Classes from "./classes";

const { Obj, Arr, Fn, Functor } = Types;

const ObjOfArr = Functor.compose(Obj)(Arr);

const implementations = {
  Iter: ["Functor", "Apply", "Chain", "Traversable", "Foldable"],
  Obj: ["Foldable", "Functor", "Traversable"]
};

const augmented =
  implementations
  |> ObjOfArr.map(k => Classes[k])
  |> Obj.pairs
  |> Arr.map(([type, classes]) => [
    type,
    classes |> Arr.foldl(Fn.flip(implement))(Types[type])
  ])
  |> Obj.fromPairs;

module.exports = { ...Types, ...augmented };
