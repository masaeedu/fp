import { Fn } from "../types";

// Equivalent minimal definitions
export const mdefs = (() => {
  const chain = ({ map, join }) => f => x => map(f)(x) |> join;
  const join = ({ chain }) => chain(Fn.id);

  return [
    { impl: { chain }, deps: ["map", "join"] },
    { impl: { join }, deps: ["chain"] }
  ];
})();

// Class methods
export const methods = ({ chain }) => {
  return {};
};
