import * as Fn from "../instances/fn";

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
export const methods = M => {
  const { chain } = M;
  const _ = {};

  // :: (a -> m b) -> m a -> m b
  _["=<<"] = chain;
  // :: m a -> (a -> m b) -> m b
  _[">>="] = Fn.flip(chain);
  // :: m a -> m b -> m b
  _[">>"] = ma => mb => chain(_ => mb)(ma);

  return _;
};
