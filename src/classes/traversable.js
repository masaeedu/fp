import { Fn } from "../types";

export const traverseFromSequenceAndMap = ({ sequence, map }) => A => f => x =>
  x |> map(f) |> sequence(A);

export const sequenceFromTraverse = ({ traverse }) => A => traverse(A)(Fn.id);

// Equivalent minimal definitions
export const mdefs = (() => {
  return [
    {
      impl: { traverse: traverseFromSequenceAndMap },
      deps: ["sequence", "map"]
    },
    { impl: { sequence: sequenceFromTraverse }, deps: ["traverse"] }
  ];
})();

// Class methods
export const methods = ({ sequence, traverse }) => {
  return {};
};
