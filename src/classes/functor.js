import { Identity } from "../types/functor/augmented";

export const mapFromOfAndChain = ({ of, chain }) => f => chain(v => f(v) |> of);

export const mapFromTraverse = ({ traverse }) => traverse(Identity);

// Equivalent minimal definitions
export const mdefs = (() => {
  return [
    { impl: { map: mapFromOfAndChain }, deps: ["of", "chain"] },
    { impl: { map: mapFromTraverse }, deps: ["traverse"] }
  ];
})();

// Class methods
export const methods = ({ map }) => {
  return {};
};
