import * as Fn from "../instances/fn";

// Equivalent minimal definitions
export const mdefs = (() => {
  const apFromLift2 = ({ lift2 }) => lift2(Fn.id);
  const lift2FromMapAndAp = ({ map, ap }) => f => x1 => x2 =>
    ap(map(f)(x1))(x2);
  const apFromOfAndChain = ({ of, chain }) => af => av =>
    af |> chain(f => av |> chain(v => f(v) |> of));

  return [
    { impl: { ap: apFromOfAndChain }, deps: ["of", "chain"] },
    { impl: { ap: apFromLift2 }, deps: ["lift2"] },
    { impl: { lift2: lift2FromMapAndAp }, deps: ["map", "ap"] }
  ];
})();

// Class methods
export const methods = F => {
  const { ap, lift2 } = F;
  const _ = {};

  if (F.ap) {
    // :: f (a -> b) -> f a -> f b
    _["<*>"] = ap;

    // :: f a -> f (a -> b) -> f b
    _["pa"] = Fn.flip(ap);
  }

  if (F.lift2) {
    // :: f a -> f b -> f a
    _["<*"] = lift2(Fn.const);

    // :: f a -> f b -> f b
    _["*>"] = lift2(Fn.flip(Fn.const));
  }

  return _;
};
