import { Fn } from "../types";

// Equivalent minimal definitions
export const mdefs = (() => {
  const traverse = ({ sequence, map }) => f => x => x |> map(f) |> sequence;
  const sequence = ({ traverse }) => traverse(Fn.id);

  return [
    { impl: { traverse }, deps: ["sequence", "map"] },
    { impl: { sequence }, deps: ["traverse"] }
  ];
})();

// Class methods
export const methods = ({ sequence, traverse }) => {
  return {};
};
