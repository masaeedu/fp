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
export const methods = ({ map, of, ap, lift2 }) => {
  const pa = Fn.flip(ap);
  const pam = Fn.flip(map);
  const apFirst = Fn.const;

  return { pa, pam, apFirst };
};
