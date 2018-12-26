const Fn = require("../instances/fn");
const { Identity } = require("../instances/fnctr");

// Equivalent minimal definitions
const mdefs = (() => {
  const mapFromOfAndChain = ({ of, chain }) => f => chain(v => f(v) |> of);
  const mapFromOfAndAp = ({ of, ap }) => f => ap(of(f));
  const mapFromTraverse = ({ traverse }) => traverse(Identity);

  return [
    { impl: { map: mapFromOfAndChain }, deps: ["of", "chain"] },
    { impl: { map: mapFromOfAndAp }, deps: ["of", "ap"] },
    { impl: { map: mapFromTraverse }, deps: ["traverse"] }
  ];
})();

// Class methods
const methods = F => {
  const _ = {};

  // :: (a -> b) -> f a -> f b
  _["<$>"] = F.map;

  // :: a -> f b -> f a
  _["<$"] = a => F.map(Fn.const(a));

  // :: f a -> (a -> b) -> f b
  _["pam"] = Fn.flip(F.map);
  _["<&>"] = _["pam"];

  return _;
};

module.exports = { mdefs, methods };
