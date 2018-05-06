import { Fn } from "../instances";

// Equivalent minimal definitions
export const mdefs = (() => {
  const ap = ({ lift2 }) => lift2(Fn.id);
  const lift2 = ({ map, ap }) => f => x1 => x2 => ap(map(f)(x1))(x2);
  const apFromOfAndChain = ({ of, chain }) => af => av =>
    af |> chain(f => av |> chain(v => f(v) |> of));

  return [
    { impl: { ap: apFromOfAndChain }, deps: ["of", "chain"] },
    { impl: { ap }, deps: ["lift2"] },
    { impl: { lift2 }, deps: ["map", "ap"] }
  ];
})();

// Class methods
export const methods = ({ map, of, ap, lift2 }) => {
  const pa = Fn.flip(ap);
  const pam = Fn.flip(map);

  return { pa, pam };
};
