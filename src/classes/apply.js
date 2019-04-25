const Fn = require("../instances/fn");
const Arr = require("../instances/arr");

// Equivalent minimal definitions
const mdefs = (() => {
  const apFromLift2 = ({ lift2 }) => lift2(Fn.id);

  const lift2FromMapAndAp = ({ map, ap }) => f => x1 => x2 =>
    ap(map(f)(x1))(x2);

  const apFromOfAndChain = ({ of, chain }) => af => av =>
    af |> chain(f => av |> chain(v => f(v) |> of));

  return [
    { impl: { ap: apFromOfAndChain }, deps: ["of", "chain"] },
    { impl: { ap: apFromLift2 }, deps: ["lift2"] },
    { impl: { lift2: lift2FromMapAndAp }, deps: ["map", "ap"] }
  ];
})();

// Class methods
const methods = F => {
  const { ap, lift2 } = F;
  const _ = {};

  if (F.ap) {
    // :: f (a -> b) -> f a -> f b
    _["<*>"] = ap;

    // :: f a -> f (a -> b) -> f b
    _["pa"] = Fn.flip(ap);
  }

  if (F.lift2) {
    // :: f a -> f b -> f a
    _["<*"] = lift2(Fn.const);

    // :: f a -> f b -> f b
    _["*>"] = lift2(Fn.flip(Fn.const));
  }

  // :: Curried as r -> Map f as -> f r
  _.liftN = f => xs => F.map(Fn.uncurry(f))(Arr.sequence(F)(xs));

  return _;
};

module.exports = { mdefs, methods };
