const Fn = require("../instances/fn");
const { Identity } = require("../instances/fnctr");

// Equivalent minimal definitions
const mdefs = (() => {
  const mapFromOfAndChain = ({ of, chain }) => f => chain(v => f(v) |> of);
  const mapFromOfAndAp = ({ of, ap }) => f => ap(of(f));
  const mapFromTraverse = ({ traverse }) => traverse(Identity);

  return {
    map: [
      { deps: ["of", "chain"], fn: mapFromOfAndChain },
      { deps: ["of", "ap"], fn: mapFromOfAndAp },
      { deps: ["traverse"], fn: mapFromTraverse }
    ]
  };
})();

// Class methods
const methods = F => {
  const _ = {};

  // :: (a -> b) -> f a -> f b
  _["<$>"] = F.map;

  // :: a -> f b -> f a
  _["<$"] = a => F.map(Fn.const(a));

  // :: f b -> a -> f a
  _["$>"] = fb => a => F.map(Fn.const(a))(fb);

  // :: f a -> (a -> b) -> f b
  _["pam"] = Fn.flip(F.map);
  _["<&>"] = _["pam"];

  return _;
};

module.exports = { mdefs, methods };
