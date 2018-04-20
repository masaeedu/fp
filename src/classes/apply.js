import { Fn } from "../types";

export const apFromLift2 = ({ lift2 }) => lift2(Fn.id);

export const lift2FromMapAndAp = ({ map, ap }) => f => x1 => x2 =>
  ap(map(f)(x1))(x2);

// Equivalent minimal definitions
export const mdefs = (() => {
  return [
    { impl: { ap: apFromLift2 }, deps: ["lift2"] },
    { impl: { lift2: lift2FromMapAndAp }, deps: ["map", "ap"] }
  ];
})();

// Class methods
export const methods = ({ map, of, ap, lift2 }) => {
  const pa = Fn.flip(ap);
  const pam = Fn.flip(map);

  return { pa, pam };
};
