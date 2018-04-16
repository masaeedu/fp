import { Identity } from "../types/fnctr";

// Equivalent minimal definitions
export const mdefs = (() => {
  const map = ({ of, chain }) => f => chain(v => f(v) |> of);
  const mapFromTraverse = ({ traverse }) => traverse(Identity);

  return [
    { impl: { map }, deps: ["of", "chain"] },
    { impl: { map: mapFromTraverse }, deps: ["traverse"] }
  ];
})();

// Class methods
export const methods = ({ map }) => {
  return {};
};
