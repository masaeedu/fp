import * as Fn from "../instances/fn";

// Equivalent minimal definitions
export const mdefs = (() => {
  const traverse = ({ sequence, map }) => A => f => x =>
    x |> map(f) |> sequence(A);
  const sequence = ({ traverse }) => A => traverse(A)(Fn.id);

  return [
    { impl: { traverse }, deps: ["sequence", "map"] },
    { impl: { sequence }, deps: ["traverse"] }
  ];
})();

// Class methods
export const methods = ({ sequence, traverse }) => {
  return {};
};
