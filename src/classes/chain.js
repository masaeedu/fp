const Fn = require("../instances/fn");

// Equivalent minimal definitions
const mdefs = (() => {
  const chain = ({ map, join }) => f => x => map(f)(x) |> join;
  const join = ({ chain }) => chain(Fn.id);

  return {
    chain: [{ deps: ["join", "map"], fn: chain }],
    join: [{ deps: ["chain"], fn: join }]
  };
})();

// Class methods
const methods = M => {
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

module.exports = { mdefs, methods };
