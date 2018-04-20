import { Fn } from "../types";

export const chainFromMapAndJoin = ({ map, join }) => f => x =>
  map(f)(x) |> join;

export const joinFromChain = ({ chain }) => chain(Fn.id);

// Equivalent minimal definitions
export const mdefs = (() => {
  return [
    { impl: { chain: chainFromMapAndJoin }, deps: ["map", "join"] },
    { impl: { join: joinFromChain }, deps: ["chain"] }
  ];
})();

// Class methods
export const methods = ({ chain }) => {
  return {};
};
