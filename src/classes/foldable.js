import { MConst } from "../types/functor/augmented";
import { IntSum, Fn } from "../types";

export const foldMapFromFoldl = ({ foldl }) => M => f =>
  foldl(b => a => f(a) |> M.append(b))(M.empty);

export const foldlFromFoldMap = ({ foldMap }) => f =>
  f |> Fn.flip |> foldMap(dual(Endo)) |> Fn.flip;

export const foldMapFromTraverse = ({ traverse }) => M => traverse(MConst(M));

// Equivalent minimal definitions
export const mdefs = (() => {
  return [
    { impl: { foldl: foldlFromFoldMap }, deps: ["foldMap"] },
    { impl: { foldMap: foldMapFromFoldl }, deps: ["foldl"] },
    { impl: { foldMap: foldMapFromTraverse }, deps: ["traverse"] }
  ];
})();

// Class methods
export const methods = ({ foldl, foldMap }) => {
  const fold = M => foldMap(M)(Fn.id);
  const length = foldMap(IntSum)(Fn.const(1));

  return { length };
};
