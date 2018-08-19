import { Identity } from "../instances/fnctr";

// Equivalent minimal definitions
export const mdefs = (() => {
  const mapFromOfAndChain = ({ of, chain }) => f => chain(v => f(v) |> of);
  const mapFromOfAndAp = ({ of, ap }) => f => ap(of(f));
  const mapFromTraverse = ({ traverse }) => traverse(Identity);

  return [
    { impl: { map: mapFromOfAndChain }, deps: ["of", "chain"] },
    { impl: { map: mapFromOfAndAp }, deps: ["of", "ap"] },
    { impl: { map: mapFromTraverse }, deps: ["traverse"] }
  ];
})();

// Class methods
export const methods = ({ map }) => {
  const mapConst = x => map(_ => x);
  return { mapConst };
};
