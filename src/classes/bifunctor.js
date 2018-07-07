import * as Fn from "../instances/fn";

// Equivalent minimal definitions
export const mdefs = (() => {
  const lmap = ({ bimap }) => f => bimap(f)(Fn.id);
  const rmap = ({ bimap }) => f => bimap(Fn.id)(f);
  const bimap = ({ lmap, rmap }) => l => r => x => x |> lmap(l) |> rmap(r);

  return [
    { impl: { lmap, rmap }, deps: ["bimap"] },
    { impl: { bimap }, deps: ["lmap", "rmap"] }
  ];
})();

// Class methods
export const methods = ({ lmap, rmap, bimap }) => {
  return {};
};
