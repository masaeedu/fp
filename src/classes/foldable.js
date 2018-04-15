import { Int, Fn, MonoidConst } from "../types";

// Monoid instance for functions of the type a -> a
const Endo = (() => {
  const empty = Fn.id;
  const append = Fn.compose;

  return { empty, append };
})();

// Dual of a monoid instance (reverses append)
const dual = ({ empty, append }) => ({ empty, append: Fn.flip(append) });

// Equivalent minimal definitions
export const mdefs = (() => {
  // Default foldMap:
  // - `foldMap(f) ≡ foldl(b => append(b) <: f)(empty)`
  const foldMap = ({ foldl }) => ({ empty, append }) => f =>
    foldl(b => a => f(a) |> append(b))(empty);

  // Default foldl:
  // - `flip(b -> a -> b)` = `a -> b -> b` is applied to every `a` in the
  //   foldable to produce `b -> b`s
  // - These have a normal monoid instance Endo corresponding to function
  //   composition, but also an "opposite" instance dual(Endo), where
  //   append(f)(g) is f :> g, rather than f <: g
  // - We want the following transformation:
  //   | foldl (+) (0) ([   1  ,     2  ,  ...])     |
  //   |       ...     ([(+ 1) ,  (+ 2) ,  ...])     | apply flipped reducer to each element
  //   |       ...     ( (+ 1) :> (+ 2) :> ... )     | compose in reverse (i.e. as pipeline)
  //   |               (          ...          ) (0) | apply composed function to base value
  const foldl = ({ foldMap }) => f =>
    f |> Fn.flip |> foldMap(dual(Endo)) |> Fn.flip;

  const foldMapFromTraverse = ({ traverse }) => M => traverse(MonoidConst(M));

  return [
    { impl: { foldl }, deps: ["foldMap"] },
    { impl: { foldMap }, deps: ["foldl"] },
    { impl: { foldMap: foldMapFromTraverse }, deps: ["traverse"] }
  ];
})();

// Class methods
export const methods = ({ foldl, foldMap }) => {
  const length = foldMap(Int.Add)(Fn.const(1));

  return { length };
};
